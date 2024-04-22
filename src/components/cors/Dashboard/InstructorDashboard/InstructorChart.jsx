import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Doughnut } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
    console.log("courses : ", courses);

    const [chartType, setChartType] = useState("students")

    // function to generate random colors
    const randomColors = (numColors) => {
        const colors = [];

        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }

    // create data for student chart
    const studentChartData = {
        labels: courses.map(course => course?.courseTitle),
        datasets: [
            {
                data: courses.map((course) => course?.totalStudentsEnrolled),
                backgroundColor: randomColors(courses?.length)
            }
        ]
    }

    // create data for income chart
    const incomeChartData = {
        labels: courses.map(course => course?.courseTitle),
        datasets: [
            {
                data: courses.map((course) => course?.totalAmountGenerated),
                backgroundColor: randomColors(courses?.length)
            }
        ]
    }

    // options
    const options = {

    }

    return (
        <div className='w-full  flex flex-col items-center gap-3 '>
            <div className='flex justify-between w-full'>
                <p className='text-2xl'>Visualise</p>
                <div className='flex gap-3'>
                    <button className='py-1 px-3 border rounded-lg' onClick={() => setChartType("students")}>Student</button>
                    <button className='py-1 px-3 border rounded-lg' onClick={() => setChartType("income")}>Earnings</button>
                </div>
            </div>
            <div className='self-center w-full flex items-center justify-center p-5 max-h-[600px]'>
                <Doughnut
                    data={chartType === "students" ? studentChartData : incomeChartData}
                    options={options}
                />
            </div>
        </div>
    )
}

export default InstructorChart