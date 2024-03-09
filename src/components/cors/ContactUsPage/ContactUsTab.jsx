import React from 'react'
import * as Icons from "react-icons/md";

const ContactUsTab = ({tab}) => {

    const Icon = Icons[tab.icon];


    return (
        <div>
            <div className="py-4 flex gap-3 items-start">
                <div className="text-xl mt-2">
                    <Icon />
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl">{tab.title}</h3>
                    <p className="text-richblack-300">{tab.description1}</p>
                    <p className="text-richblack-300">{tab.description2}</p>
                </div>
            </div>
        </div>
    )
}

export default ContactUsTab