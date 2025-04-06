const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const Leave = require('./models/Leave');

const app = express();

// Middleware
app.use(cors(
    {
        origin : ["https://hostelverse-client.vercel.app"],
        methods=["*"],
        credentials=true
    }
));
app.use(express.json());

// Load environment variables
require('dotenv').config();

// MongoDB Connection
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', process.env.MONGODB_URI);
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected Successfully!');
        
        // Create indexes
        await Complaint.createIndexes();
        console.log('Complaint indexes created successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        console.error('Full error details:', {
            name: err.name,
            message: err.message,
            stack: err.stack
        });
        process.exit(1);
    }
};

// Make sure MongoDB is connected before starting the server
connectDB().then(() => {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log('Server is ready to accept complaints!');
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

// Registration Route
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        console.log('Registration attempt:', { fullName, email, role });

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Normalize and validate role
        const normalizedRole = role ? role.toLowerCase() : 'student';
        console.log('Normalized role:', normalizedRole);

        const validRoles = ['student', 'warden', 'watchman'];
        if (!validRoles.includes(normalizedRole)) {
            console.log('Invalid role specified:', normalizedRole);
            return res.status(400).json({ message: 'Invalid role specified' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            fullName,
            email,
            password: hashedPassword,
            role: normalizedRole // Use normalized role
        });

        const savedUser = await user.save();
        console.log('User registered successfully:', {
            id: savedUser._id,
            email: savedUser.email,
            role: savedUser.role
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                email: savedUser.email,
                role: savedUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Check Role Route
app.post('/api/check-role', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email }).select('role');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ role: user.role });
    } catch (error) {
        console.error('Error checking role:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: 'Please provide email, password, and role'
            });
        }

        // Find user and include password for validation
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).json({
                message: 'Email not found. Please check your email or register.'
            });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: 'Incorrect password. Please try again.'
            });
        }

        // Validate role match
        const normalizedRequestedRole = role.toLowerCase();
        const normalizedUserRole = user.role.toLowerCase();

        if (normalizedRequestedRole !== normalizedUserRole) {
            return res.status(403).json({
                message: `Access denied. You are not registered as a ${normalizedRequestedRole}.`
            });
        }

        // Prepare user data for response
        const userData = {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: normalizedUserRole
        };

        // Send success response
        res.status(200).json({
            message: 'Login successful',
            user: userData
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Complaint Routes

// Create a new complaint
app.post('/api/complaints', async (req, res) => {
    try {
        console.log('\n=== New Complaint Submission ===');
        console.log('1. Received request with body:', req.body);

        const { title, description, studentId } = req.body;

        // Validate required fields
        if (!title || !description || !studentId) {
            console.log('2. Validation Error - Missing Fields:');
            console.log('- title:', title);
            console.log('- description:', description);
            console.log('- studentId:', studentId);
            return res.status(400).json({ 
                message: 'Title, description, and studentId are required'
            });
        }

        console.log('2. All required fields present');

        // Create new complaint
        const complaintData = {
            title,
            description,
            studentId,
            status: 'pending',
            date: new Date()
        };

        console.log('3. Creating complaint with data:', complaintData);

        try {
            // Check MongoDB connection
            if (mongoose.connection.readyState !== 1) {
                throw new Error('MongoDB not connected. Current state: ' + mongoose.connection.readyState);
            }

            const complaint = new Complaint(complaintData);
            console.log('4. Created complaint model instance');

            const savedComplaint = await complaint.save();
            console.log('5. Successfully saved complaint:', savedComplaint);

            return res.status(201).json({
                message: 'Complaint submitted successfully',
                complaint: savedComplaint
            });
        } catch (dbError) {
            console.error('Database Error:', {
                name: dbError.name,
                message: dbError.message,
                stack: dbError.stack
            });
            return res.status(500).json({
                message: 'Database error while saving complaint',
                error: dbError.message
            });
        }
    } catch (error) {
        console.error('Server Error:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        return res.status(500).json({
            message: 'Server error while processing complaint',
            error: error.message
        });
    }
});

// Get all complaints
app.get('/api/complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .sort({ date: -1 }); // Sort by date, newest first
        
        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Error fetching complaints', error: error.message });
    }
});

// Get complaints for a specific student
app.get('/api/complaints/student/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        console.log('Fetching complaints for student:', studentId);

        const complaints = await Complaint.find({ studentId })
            .sort({ date: -1 });

        console.log(`Found ${complaints.length} complaints`);
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({
            message: 'Error fetching complaints',
            error: error.message
        });
    }
});

// Update complaint status
app.put('/api/complaints/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        console.log('Updating complaint:', { id, status });

        // Validate status
        const validStatuses = ['pending', 'in-progress', 'resolved'];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { $set: { status } },
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        console.log('Successfully updated complaint:', updatedComplaint);
        res.status(200).json({
            message: 'Complaint updated successfully',
            complaint: updatedComplaint
        });
    } catch (error) {
        console.error('Error updating complaint:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            message: 'Error updating complaint', 
            error: error.message 
        });
    }
});

// Delete complaint
app.delete('/api/complaints/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.json({ message: 'Complaint deleted successfully' });
    } catch (error) {
        console.error('Error deleting complaint:', error);
        res.status(500).json({ message: 'Error deleting complaint', error: error.message });
    }
});

// Leave Routes

// Submit a new leave request
app.post('/api/leaves', async (req, res) => {
    try {
        console.log('Received leave request:', req.body);
        const { 
            studentName, 
            roomNumber, 
            startDate, 
            endDate, 
            reason, 
            parentName, 
            parentContact 
        } = req.body;

        // Calculate duration
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const leaveData = {
            studentName,
            roomNumber,
            startDate,
            endDate,
            duration,
            reason,
            parentName,
            parentContact
        };

        const leave = new Leave(leaveData);
        const savedLeave = await leave.save();

        res.status(201).json({
            message: 'Leave request submitted successfully',
            leave: savedLeave
        });
    } catch (error) {
        console.error('Error submitting leave request:', error);
        res.status(500).json({ 
            message: 'Error submitting leave request', 
            error: error.message 
        });
    }
});

// Get all leave requests
app.get('/api/leaves', async (req, res) => {
    try {
        const leaves = await Leave.find().sort({ submittedAt: -1 });
        res.json(leaves);
    } catch (error) {
        console.error('Error fetching leaves:', error);
        res.status(500).json({ 
            message: 'Error fetching leaves', 
            error: error.message 
        });
    }
});

// Get leave requests for a specific student
app.get('/api/leaves/student/:studentName', async (req, res) => {
    try {
        const { studentName } = req.params;
        const leaves = await Leave.find({ studentName }).sort({ submittedAt: -1 });
        res.json(leaves);
    } catch (error) {
        console.error('Error fetching student leaves:', error);
        res.status(500).json({ 
            message: 'Error fetching student leaves', 
            error: error.message 
        });
    }
});

// Update leave request status
app.put('/api/leaves/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ message: 'Leave request not found' });
        }

        res.json({
            message: 'Leave request updated successfully',
            leave: updatedLeave
        });
    } catch (error) {
        console.error('Error updating leave request:', error);
        res.status(500).json({ 
            message: 'Error updating leave request', 
            error: error.message 
        });
    }
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hostel Management API is running');
});
