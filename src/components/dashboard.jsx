import React from "react";
import logo from '../../src/assets/image/logo.jpg';
import profile from '../../src/assets/image/profile.png';
import logout from '../../src/assets/image/logout.png';
import more from '../../src/assets/image/more.png';
import cart from '../../src/assets/image/cart.png';
import calendar from '../../src/assets/image/calendar.png';
import dashboard from '../../src/assets/image/dashboard.png';
import product from '../../src/assets/image/product.png';
import { DayPicker, Row, RowProps } from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import 'react-day-picker/dist/style.css';
import './daypicker.css'

import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faCloud, faMapMarkerAlt, faTimes, faTint, faWind } from '@fortawesome/free-solid-svg-icons'

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);

// function 


// function OnlyFutureRow(props: RowProps) {
//     const isPastRow = props.dates.every(isPastDate);
//     if (isPastRow) return <></>;
//     return <Row {...props} />;
// }

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: '#FFEF8D',
            borderWidth: 2,
            fill: false,
            data: [25000, 23000, 19000, 17000, 21000, 23000, 24000]
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#37B04C',
            data: [25000, 23000, 19000, 17000, 21000, 23000, 24000],
            borderColor: 'white',
            borderWidth: 2,
        },
    ],
};

class Dashboard extends React.Component {
    constructor() {
        super()
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        var endDate = new Date();
        endDate.setDate(endDate.getDate() - 1);

        var today = new Date();

        this.startDate = startDate.getDate() + ' ' + monthNames[startDate.getMonth()] + ' ' + startDate.getFullYear();
        this.endDate = endDate.getDate() + ' ' + monthNames[endDate.getMonth()] + ' ' + endDate.getFullYear();

        this.state = {
            placeholderStart: startDate,
            placeholderEnd: endDate,
            today: today,
            disabledDays: differenceInCalendarDays(this.placeholderEnd, new Date()) > 0,
        }


    }

    setSelectedStart = (e) => {
        this.setState({
            placeholderStart: e
        })
    }

    setSelectedEnd = (e) => {
        this.setState({
            placeholderEnd: e
        })
    }

    isPastDate(date: Date) {
        return differenceInCalendarDays(date, new Date()) > 0;
    }

    isEndDate = (date: Date) => {
        return differenceInCalendarDays(date, this.state.placeholderEnd) > 0;
    }

    todayDate = () => {
        let today = new Date()
        this.setState({
            placeholderStart: today,
            placeholderEnd: today,
        })
    }
    yesterdayDate = () => {
        let yesterday = new Date();
        yesterday = new Date(parseInt(yesterday.setDate(yesterday.getDate() - 1)));
        this.setState({
            placeholderStart: yesterday,
            placeholderEnd: yesterday,
        })
    }
    last7Day = () => {
        let today = new Date();
        let sevenDays = new Date()
        sevenDays = new Date(parseInt(sevenDays.setDate(sevenDays.getDate() - 7)));
        console.log(sevenDays, today)
        this.setState({
            placeholderStart: sevenDays,
            placeholderEnd: today,
        })
    }

    last30Day = () => {
        let today = new Date();
        let thirty = new Date()
        thirty = new Date(parseInt(thirty.setDate(thirty.getDate() - 30)));
        console.log(thirty, today)
        this.setState({
            placeholderStart: thirty,
            placeholderEnd: today,
        })
    }


    render() {

        const list = [];
        // 
        for (var i = 0; i < 5; i++) {
            list.push(
                <div className={`flex flex-wrap items-center mt-[8px] w-full rounded-[4px] ${i === 0 ? "bg-[#FFE7BD] " : " border-[0.5px] border-[#C5C5C59C]"}`} key={i}>
                    <div>
                        {i === 0 ? <img src={product} className="w-[80px] h-[80px]" /> : <img src={product} className="w-[60px] h-[60px] " />}
                    </div>
                    {i === 0 ? (
                        <div className="pl-[8px]">
                            <h3 className=" text-[20px] leading-[25px] text-[#000000DE] font-normal">[Nama Product]</h3>
                            <div className="flex flex-wrap w-[151px]">
                                <div className="basis-6/12">
                                    <p className="text-[#00000099] text-[14px] leading-[20px] tracking-[0.25px]">Rp XXXX</p>
                                </div>
                                <div className="basis-6/12">
                                    <p className="text-[#00000099] text-[14px] leading-[20px] tracking-[0.25px]">[jml terjual]</p>

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="ml-[8px]">
                            <h3 className=" text-[16px] leading-[20px] text-[#000000DE] font-normal">[Nama Product]</h3>
                            <div className="flex flex-wrap w-[151px]">
                                <div className="basis-6/12">
                                    <p className="text-[#00000099] text-[12px] leading-[20px] tracking-[0.25px]">Rp XXXX</p>
                                </div>
                                <div className="basis-6/12">
                                    <p className="text-[#00000099] text-[12px] leading-[20px] tracking-[0.25px]">[jml terjual]</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div className='w-full bg-[#F7F7F7]'>
                <nav className='bg-white shadow-[0px_3px_6px_#00000029] h-[64px] fixed z-[2] top-0 w-full px-[34px] pt-[17px] pb-[15px]'>
                    <div className='flex flex-wrap h-full'>
                        <div className='basis-6/12 h-full flex flex-wrap'>
                            <img src={logo} className="w-[129px]" />
                            <p className='text-[11px] leading-[15px] text-[#5B5B5B] ml-[18.8px] mt-[10px]'>powered by</p>
                            <img src={logo} className="w-[72px] h-[18px] mt-[10px] ml-[4px]" />
                        </div>
                        <div className='basis-6/12 flex flex-wrap h-full items-center justify-end'>
                            <div className='text-center'>
                                <h3 className='text-[14px] leading-[19px] text-[#727272] font-semibold'>Username</h3>
                                <p className='text-[10px] leading-[14px] text-[#727272] font-light'>Company Name</p>
                            </div>
                            <div className='ml-[16px] mr-[22px]'>
                                <img src={profile} className="w-[32px]" />
                            </div>
                            <div className=''>
                                <img src={logout} className="w-[15px]" />
                            </div>
                        </div>
                    </div>
                </nav>
                <div className='flex h-[100vh] mt-[3rem]'>
                    <div className='w-[72px] bg-white border-r-[0.5px] border-[#D2D2D2] '>
                        <div className='px-[24px] py-[24px] bg-white'>
                            <div className='w-[24px] h-[21px]'>

                            </div>
                        </div>
                        <div className='px-[24px] py-[13px] bg-[#D2D2D2]'>
                            <div className='w-[24px] h-[21px] bg-white'>
                                <img src={dashboard} className="mx-auto pt-[2px]" />
                            </div>
                        </div>
                    </div>
                    <div className='container mx-auto mt-[3rem] relative'>
                        <div className="w-[690px] h-fit bg-white absolute right-0">
                            <div className="flex flex-wrap mx-[20px] my-[20px]">
                                <div className="basis-3/12 flex">
                                    <img src={calendar} />
                                    <h3 className='ml-[16px] text-[#8B8B8B] text-[16px]'>Period</h3>
                                </div>
                                <div className="basis-9/12 text-right">
                                    <FontAwesomeIcon icon={faTimes} />
                                </div>
                            </div>
                            <div className="flex flex-wrap mx-[20px] my-[20px]">
                                <div className="basis-3/12 border-r-[2px] pr-[20px]">
                                    <div className="mb-[5px] border-b-[1px] pb-[10px] text-[#9C9BA9] text-[12px] cursor-pointer" onClick={this.todayDate}>Today</div>
                                    <div className="mb-[5px] border-b-[1px] pb-[10px] text-[#9C9BA9] text-[12px] cursor-pointer" onClick={this.yesterdayDate}>Yesterday</div>
                                    <div className="mb-[5px] border-b-[1px] pb-[10px] text-[#9C9BA9] text-[12px] cursor-pointer" onClick={this.last7Day}>Last 7 days</div>
                                    <div className="mb-[5px] border-b-[1px] pb-[10px] text-[#9C9BA9] text-[12px] cursor-pointer" onClick={this.last30Day}>Last 30 days</div>
                                    <div className="mb-[5px] border-b-[1px] pb-[10px] text-[#9C9BA9] text-[12px] cursor-pointer">This Month</div>
                                    <div className="mb-[5px] pb-[10px] text-[#9C9BA9] text-[12px]">Custom</div>
                                    <div className="mb-[5px]"><button className="text-center bg-[#31A445] w-full text-white h-[35px] text-[12px]"> Apply</button></div>
                                </div>
                                <div className="basis-9/12 flex flex-wrap">
                                    <div className="basis-6/12">
                                        <DayPicker selected={this.state.placeholderStart} onDayClick={this.setSelectedStart} disabled={this.isEndDate} />
                                    </div>
                                    <div className="basis-6/12">
                                        <DayPicker selected={this.state.placeholderEnd} onDayClick={this.setSelectedEnd} disabled={this.isPastDate} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-wrap'>
                            <div className='basis-6/12 flex items-center'>
                                <h2 className='font-semibold text-[40px] leading-[28px] text-[#707070C4]'>
                                    Dashboard
                                </h2>
                            </div>
                            <div className="basis-6/12 flex justify-end">
                                <div className='w-fit bg-white h-[48px] py-[13px] px-[16px] flex flex-wrap cursor-pointer'>
                                    <img src={calendar} />
                                    <h3 className='ml-[16px] text-[#8B8B8B] text-[16px]'>Period <span className="text-[#6A6A6A] px-[24px]">{this.startDate} - {this.endDate}</span></h3>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-wrap bg-[#37B04C] mt-[31px] pt-[12px] pb-[11px] px-[12px] text-white items-center'>
                            <div className='uppercase basis-6/12 text-left text-[20px] font-bold'>market insight</div>
                            <div className=' basis-6/12 text-right underline'>Click Here for Help </div>
                        </div>
                        <div className='flex flex-wrap mt-[16px]'>
                            <div className='w-[276px] h-[104px] bg-white shadow-[0px_2px_6px_#0000000A] px-[12px] pt-[12px]  '>
                                <div className='flex flex-wrap items-center'>
                                    <div className='basis-6/12'>
                                        <p className='text-[14px] leading-[16px] text-[#A1A0AE] tracking-[0.5px]'>Sales Turnover</p>
                                    </div>
                                    <div className='basis-6/12 flex items-center justify-end'>
                                        <img src={more} className="" />
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center'>
                                    <div className='basis-8/12'>
                                        <h3 className='text-[23px] font-bold'>Rp 3,600,000</h3>
                                        <p className='text-[10px] text-[#A1A0AE] '><span className='font-black text-[#FF4141] text-[11px]'>&darr; 13.8%</span> last period in products sold</p>
                                    </div>
                                    <div className='basis-4/12 flex justify-start'>
                                        <img src={cart} className="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-wrap mt-[16px]'>
                            <div className='basis-6/12 h-[424px] pr-[1rem]'>
                                <div className='w-full h-full bg-white shadow-[0px_2px_6px_#0000000A] border-[0.5px] border-[#CDCDCD] rounded-[2px]  px-[16px] py-[16px]'>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='basis-10/12'>
                                            <p className='text-[20px] leading-[13px] text-[#4D4F5C] font-nromal'>AVERAGE PURCHASE VALUE</p>
                                        </div>
                                        <div className='basis-2/12 flex items-center justify-end'>
                                            <img src={more} className="" />
                                        </div>
                                    </div>
                                    <div className="mt-[20px]">
                                        <Chart type='bar' data={data} />
                                    </div>
                                </div>
                            </div>
                            <div className='basis-3/12 h-[424px] px-[0.5rem]'>
                                <div className='w-full h-full bg-white shadow-[0px_2px_6px_#0000000A] border-[0.5px] border-[#CDCDCD] rounded-[2px] px-[16px] py-[16px]'>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='basis-10/12'>
                                            <p className='text-[20px] leading-[13px] text-[#4D4F5C] font-nromal'>BEST SELLING SKU</p>
                                        </div>
                                        <div className='basis-2/12 flex items-center justify-end'>
                                            <img src={more} className="" />
                                        </div>
                                        <div className="basis-full">
                                            {list}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='basis-3/12 h-[424px] pl-[1rem]'>
                                <div className='w-full h-full bg-white shadow-[0px_2px_6px_#0000000A] border-[0.5px] border-[#CDCDCD] rounded-[2px] px-[16px] py-[16px]'>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='basis-10/12'>
                                            <p className='text-[20px] leading-[13px] text-[#4D4F5C] font-nromal'>Top Competitor SKU</p>
                                        </div>
                                        <div className='basis-2/12 flex items-center justify-end'>
                                            <img src={more} className="" />
                                        </div>
                                        <div className="basis-full">
                                            {list}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;