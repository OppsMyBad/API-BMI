const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())


app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    let height = Number(req.query.height);
    const unit = req.query.unit; 

    if (!weight || !height || isNaN(weight) || isNaN(height)) {
        return res.json({ error: "กรอกตัวเลขที่ถูกต้อง" });
    }
    if (weight <= 0 || height <= 0) {
        return res.json({ error: "น้ำหนักและส่วนสูงต้องมากกว่า 0" });
    }

    if (unit === 'cm') {
        height = height / 100;
    }

    const bmi = weight / (height * height);

    let category = "";
    if (bmi < 18.5) {
        category = "Skinny";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
    } else if (bmi >= 30 && bmi < 34.9) {
        category = "Obese I";
    } else {
        category = "Obese II";
    }

    res.json({ 
        bmi: bmi.toFixed(2), 
        category: category 
    });
});
app.listen(3000, () => {
    console.log("BMI server running on port 3000")
})