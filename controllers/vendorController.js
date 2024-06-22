const Vendor = require('../models/vendor')

const vendorController = {

    create: async (req, res) => {
        try {
            const { name, serviceType, contactDetails: { phone, email }, priceRange } = req.body;
            if (!req.userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            const newVendor = new Vendor({
                name,
                serviceType,
                contactDetails: { phone, email },
                priceRange
            })
            await newVendor.save();
            res.status(201).json(newVendor);
        }
        catch (error) {
            res.status(400).json({ error: error.message });

        }
    },
    getAllVendors: async (req, res) => {
        try {
            const Vendors = await Vendor.find();
            res.json(Vendors)
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getVendor: async (req, res) => {
        try {
            // Access the user ID from req.params
            const vendorID = req.params.id;

            // Retrieve the user from the database using the user ID
            const vendor = await Vendor.findById(vendorID);

            // Check if the user exists
            if (!vendor) {
                return res.status(404).json({ message: 'Event not found' });
            }

            // Send the user data in the response
            res.json(vendor);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateVendor: async (req, res) => {
        try {
            const vendorID = req.params.id;
            const { name, serviceType, contactDetails, priceRange } = req.body;
            // Ensure the user is authenticated
            if (!req.userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            // Prepare update data
            const updateData = { name, serviceType, priceRange };

            // Check if contactDetails is provided and destructure it
            if (contactDetails) {
                const { phone, email } = contactDetails;
                updateData.contactDetails = { phone, email };
            }

            const updatedVendor = await Vendor.findByIdAndUpdate(
                vendorID,
                updateData,
                { new: true, runValidators: true }
            );
            if (!updatedVendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            res.json(updatedVendor);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    deleteVendor: async (req, res) => {
        try {
            await Vendor.findByIdAndDelete(req.params.id);
            res.json({ message: 'Vendor deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    searchVendors: async (req, res) => {
        try {
            console.log(req.query)
            const query = {};
            if (req.query.serviceType) {
                query.serviceType = { $regex: req.query.serviceType, $options: 'i' };
            }
            if (req.query.priceRange) {
                const [minPrice, maxPrice] = req.query.priceRange.split('-').map(Number);
                query.price = { $gte: minPrice, $lte: maxPrice };
            }
            const vendors = await Vendor.find(query);
            if (vendors.length === 0) {
                return res.status(404).json({ message: 'No vendors found matching your criteria' });
            }
            console.log(vendors)
            res.json(vendors);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = vendorController;