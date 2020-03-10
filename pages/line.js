import React, { useState } from 'react'
const Line = props => {
    const [water, setWater] = useState({
        status: "เปิดน้ำ"
    })
    return (
        <>
            <div className="test">
                <button onClick={() => setWater({ status: "ปิดน้ำ" })} ><h>{water.status}</h></button>
                <button>ดูสถานะ</button>
                <button>ตั้งเวลาปิดน้ำ</button>
                <button>ตั้งปิดน้ำตามความชื้น</button>
            </div>
            <style jsx>{`
                    button{
                        background: #4162a8;
                        border-top: 1px solid #38538c;
                        border-right: 1px solid #1f2d4d;
                        border-bottom: 1px solid #151e33;
                        border-left: 1px solid #1f2d4d;
                        border-radius: 4px;
                        box-shadow(inset 0 1px 10px 1px #5c8bee, 0 1px 0 #1d2c4d, 0 6px 0 #1f3053, 0 8px 4px 1px #111);
                        color: #fff;
                        font: bold 20px/1 "helvetica neue", helvetica, arial, sans-serif;
                        margin-bottom: 10px;
                        padding: 10px 0 12px 0;
                        text-align: center;
                        text-shadow: 0 -1px 1px #1e2d4d;
                        -webkit-background-clip: padding-box;
                        height:200px;
                    }
                    .test{
                        display:flex;
                        flex-direction:column;
                    }
            `}</style>
        </>
    )
}

export default Line
