const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false // Don't include password by default in queries
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['student', 'warden', 'watchman'],
            message: 'Invalid role. Must be student, warden, or watchman.'
        },
        default: 'student',
        index: true,
        lowercase: true, // Mongoose will automatically convert to lowercase
        trim: true // Remove whitespace
    }
}, {
    timestamps: true,
    toJSON: {
        transform: function(doc, ret) {
            delete ret.password;
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            ret.role = ret.role.toLowerCase(); // Ensure role is lowercase in JSON
            return ret;
        }
    }
});

// Pre-save middleware to validate and normalize role
userSchema.pre('save', function(next) {
    if (this.isModified('role')) {
        // Ensure role is set and lowercase
        if (!this.role) {
            this.role = 'student';
        } else {
            this.role = this.role.toLowerCase();
        }

        // Validate role
        const validRoles = ['student', 'warden', 'watchman'];
        if (!validRoles.includes(this.role)) {
            next(new Error('Invalid role specified'));
            return;
        }
    }
    next();
});

// Static method to find user by email with role
userSchema.statics.findByEmailWithRole = function(email) {
    return this.findOne({ email })
        .select('+password')
        .select('fullName email role _id')
        .exec();
};

module.exports = mongoose.model('User', userSchema);
