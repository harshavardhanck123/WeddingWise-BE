const Budget=require('../models/Budget')
const Event = require('../models/event');
const budgetController={
    create:async(req,res)=>{
        try{
            const { eventId, category, amount } = req.body;

            // Ensure the user is authenticated
            if (!req.userId) {
              return res.status(400).json({ message: 'User ID is required' });
            }
      
            // Check if the event exists
            const event = await Event.findById(eventId);
            if (!event) {
              return res.status(404).json({ message: 'Event not found' });
            }
      
            // Create new budget entry
            const newBudget = new Budget({
              eventId,
              category,
              amount
            });
      
            await newBudget.save();
            res.status(201).json(newBudget);
        }
        catch(error){
            res.status(400).json({error:error.message})
        }
    },
    getAllBudget:async(req,res)=>{
      try{
          const budget=await Budget.find();
          res.json(budget)
      }
      catch(error){
        res.status(201).json({error:error.message})
      }
    },
    getBudget:async(req,res)=>{
      try{
          const budgetID=req.params.id;
          const budget= await Budget.findById(budgetID)
          if(!budgetID){
            return res.status(404).json({ message: 'Budget not found' });
          }
          res.json(budget)
      }
      catch(error){
        res.status(201).json({error:error.message})
      }
    },
    updateBudget:async(req,res)=>{
      try{
        const budgetID=req.params.id;
        const {category,amount,spent}=req.body
        if(!req.userId){
          return res.status(404).json({ message: 'Budget not found' });
        }
        const budget = await Budget.findByIdAndUpdate(budgetID, {category,amount,spent  }, { new: true, runValidators: true });
        if (!budget) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(budget);
      }
      catch(error){
        res.status(201).json({error:error.message})
      }
    },
    deleteBudget: async (req, res) => {
      try {
          await Budget.findByIdAndDelete(req.params.id);
          res.json({ message: 'Event deleted' });
      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }
}

module.exports=budgetController;