import React from "react";
import logo from '../../src/assets/image/logo.jpg';
import profile from '../../src/assets/image/profile.png';
import logout from '../../src/assets/image/logout.png';
import more from '../../src/assets/image/more.png';
import cart from '../../src/assets/image/cart.png';
import calendar from '../../src/assets/image/calendar.png';
import dashboard from '../../src/assets/image/dashboard.png';
import product from '../../src/assets/image/product.png';
import menu from '../../src/assets/image/menu.png';

import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip,
    registerables as registerablesJS
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
ChartJS.register(...registerablesJS);

import { DayPicker, } from 'react-day-picker';
import { differenceInCalendarDays } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons'

import 'react-day-picker/dist/style.css';
import './daypicker.css'

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Tooltip
);

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
            defaultSelected: {
                from: startDate,
                to: endDate
            },
            custom: true,
            selectedMenu: 'custom',
            calendar: false
        }

        this.box = React.createRef();
        this.calendarTrigger = React.createRef();


    }

    componentDidMount() {

        // Adding a click event listener
        document.addEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        if (this.box && !this.box.current.contains(event.target)) {
            if (!this.calendarTrigger.current.contains(event.target)) {
                this.setState({
                    calendar: false
                })
            }
        }
    }

    defaultSelected = (DateRange) => {
        return {
            from: this.state.startDate,
            to: this.state.endDate
        }
    };

    setSelectedStart = (e) => {
        if (this.state.custom === true) {
            this.setState({
                placeholderStart: e
            })
        }
    }

    setSelectedEnd = (e) => {
        if (this.state.custom === true) {
            this.setState({
                placeholderEnd: e
            })
        }
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
            defaultSelected: {
                from: today,
                to: today
            },
            selectedMenu: 'today',
            custom: false

        })
    }
    yesterdayDate = () => {
        let yesterday = new Date();
        yesterday = new Date(parseInt(yesterday.setDate(yesterday.getDate() - 1)));
        this.setState({
            placeholderStart: yesterday,
            placeholderEnd: yesterday,
            defaultSelected: {
                from: yesterday,
                to: yesterday
            },
            selectedMenu: 'yesterday',
            custom: false

        })
    }
    last7Day = () => {
        let today = new Date();
        let sevenDays = new Date()
        sevenDays = new Date(parseInt(sevenDays.setDate(sevenDays.getDate() - 7)));
        this.setState({
            placeholderStart: sevenDays,
            placeholderEnd: today,
            defaultSelected: {
                from: sevenDays,
                to: today
            },
            selectedMenu: '7days',
            custom: false

        })
    }

    last30Day = () => {
        let today = new Date();
        let thirty = new Date()
        thirty = new Date(parseInt(thirty.setDate(thirty.getDate() - 30)));
        this.setState({
            placeholderStart: thirty,
            placeholderEnd: today,
            defaultSelected: {
                from: thirty,
                to: today
            },
            selectedMenu: '30days',
            custom: false
        })
    }


    updateSelectedDate = (e) => {
        if (this.state.custom === true) {
            this.setState({ defaultSelected: e })
        }
    }
    customMode = () => {
        this.setState({
            custom: true,
            selectedMenu: 'custom'
        })
    }

    thisMonth = () => {
        let firstDay = new Date();
        firstDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1);

        let lastDay = new Date();
        lastDay = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 0);

        let today = new Date();

        if (lastDay !== today) {
            lastDay = today;
        }

        this.setState({
            placeholderStart: firstDay,
            placeholderEnd: today,
            defaultSelected: {
                from: firstDay,
                to: today
            },
            selectedMenu: 'month',
            custom: false
        })


    }

    openCalendar = () => {
        this.setState({
            calendar: true
        })
    }

    applyDate = () => {
        this.setState({
            calendar: false
        })
    }
    render() {

        const list = [];
        // 
        for (var i = 0; i < 5; i++) {
            list.push(
                <div className={`flex flex-wrap items-center mt-[8px] w-full rounded-[4px] ${i === 0 ? "bg-[#FFE7BD] " : " border-[0.5px] border-[#C5C5C59C]"}`} key={i}>
                    <div>
                        {i === 0 ? <img alt="" src={product} className="w-[80px] h-[80px]" /> : <img alt="" src={product} className="w-[60px] h-[60px] " />}
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
                <nav className='bg-white shadow-[0px_3px_6px_#00000029] h-[80px] lg:h-[64px] fixed z-[2] top-0 w-full px-[20px] lg:px-[34px] pt-[17px] pb-[15px]'>
                    <div className='flex flex-wrap h-full'>
                        <div className='basis-6/12 h-full flex flex-wrap'>
                            <img alt="" src={logo} className="w-[129px]" />
                            <p className='text-[11px] leading-[15px] text-[#5B5B5B] lg:ml-[18.8px] lg:mt-[10px]'>powered by</p>
                            <img alt="" src={logo} className="w-[72px] h-[18px] lg:mt-[10px] ml-[4px]" />
                        </div>
                        <div className='basis-6/12 flex flex-wrap h-full items-center justify-end'>
                            <div className='text-center'>
                                <h3 className='text-[14px] leading-[19px] text-[#727272] font-semibold'>Username</h3>
                                <p className='text-[10px] leading-[14px] text-[#727272] font-light'>Company Name</p>
                            </div>
                            <div className='ml-[16px] mr-[22px]'>
                                <img alt="" src={profile} className="w-[32px]" />
                            </div>
                            <div className=''>
                                <img alt="" src={logout} className="w-[15px]" />
                            </div>
                        </div>
                    </div>
                </nav>
                <div className='flex lg:h-fit 2xl:h-[100vh] mt-[4rem]'>
                    <div className='hidden lg:block w-[72px] bg-white border-r-[0.5px] border-[#D2D2D2] '>
                        <div className='px-[24px] py-[24px] bg-white'>
                            <div className='w-[24px] h-[15px]'>
                                <img alt="" src={menu} className="mx-auto pt-[2px]" />
                            </div>
                        </div>
                        <div className='px-[24px] py-[13px] bg-[#D2D2D2]'>
                            <div className='w-[24px] h-[21px] bg-white'>
                                <img alt="" src={dashboard} className="mx-auto pt-[2px]" />
                            </div>
                        </div>
                    </div>
                    <div className='w-full px-[1rem] container mx-auto mt-[3rem] relative'>
                        <div className={`w-full lg:w-[690px] h-fit bg-white absolute right-0 ${this.state.calendar === true ? '' : 'hidden'}`} ref={this.box}>
                            <div className="flex flex-wrap mx-[20px] my-[20px]">
                                <div className="basis-3/12 flex">
                                    <img alt="" src={calendar} />
                                    <h3 className='ml-[16px] text-[#8B8B8B] text-[16px]'>Period</h3>
                                </div>
                                <div className="basis-9/12 text-right">
                                    <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={this.applyDate} />
                                </div>
                            </div>
                            <div className="flex flex-wrap mx-[20px] my-[20px]">
                                <div className="basis-full lg:basis-3/12 lg:border-r-[2px] pr-[20px]">
                                    <div className={`mb-[5px] border-b-[1px] pb-[10px]  text-[12px] cursor-pointer ${this.state.selectedMenu === "today" ? "text-[#31A445] font-bold" : "text-[#9C9BA9]"}`} onClick={this.todayDate}>Today</div>
                                    <div className={`mb-[5px] border-b-[1px] pb-[10px] text-[12px] cursor-pointer ${this.state.selectedMenu === "yesterday" ? "text-[#31A445] font-bold" : "text-[#9C9BA9]"}`} onClick={this.yesterdayDate}>Yesterday</div>
                                    <div className={`mb-[5px] border-b-[1px] pb-[10px] text-[12px] cursor-pointer ${this.state.selectedMenu === "7days" ? "text-[#31A445] font-bold" : "text-[#9C9BA9]"}`} onClick={this.last7Day}>Last 7 days</div>
                                    <div className={`mb-[5px] border-b-[1px] pb-[10px] text-[12px] cursor-pointer ${this.state.selectedMenu === "30days" ? "text-[#31A445] font-bold" : "text-[#9C9BA9]"}`} onClick={this.last30Day}>Last 30 days</div>
                                    <div className={`mb-[5px] border-b-[1px] pb-[10px] text-[12px] cursor-pointer ${this.state.selectedMenu === "month" ? "text-[#31A445] font-bold" : "text-[#9C9BA9]"}`} onClick={this.thisMonth}>This Month</div>
                                    <div className={`mb-[5px] pb-[10px] text-[12px] cursor-pointer ${this.state.selectedMenu === "custom" ? "text-[#31A445] font-bold" : "text-[#9C9BA9]"}`} onClick={this.customMode}>Custom</div>
                                    <div className="mb-[5px]"><button className="text-center bg-[#31A445] w-full text-white h-[35px] text-[12px]" onClick={this.applyDate}> Apply</button></div>
                                </div>
                                <div className="basis-full lg:basis-9/12 flex flex-wrap">
                                    <div className="basis-full lg:basis-6/12">
                                        <DayPicker selected={this.state.defaultSelected} mode="range" onSelect={e => this.updateSelectedDate(e)} onDayClick={this.setSelectedStart} disabled={this.isPastDate} />
                                    </div>
                                    <div className="basis-full lg:basis-6/12">
                                        <DayPicker selected={this.state.defaultSelected} mode="range" onSelect={e => this.updateSelectedDate(e)} onDayClick={this.setSelectedEnd} disabled={this.isPastDate} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-wrap px-[0.5rem]'>
                            <div className='basis-full lg:basis-6/12 flex items-center'>
                                <h2 className='font-semibold text-[40px] leading-[28px] text-[#707070C4]'>
                                    Dashboard
                                </h2>
                            </div>
                            <div className="basis-full lg:basis-6/12 flex justify-end mt-[16px] lg:mt-[0px]">
                                <div className='w-full lg:w-fit bg-white lg:h-[48px] py-[13px] px-[8px] lg:px-[16px] flex flex-wrap cursor-pointer items-center' onClick={this.openCalendar} ref={this.calendarTrigger}>
                                    <img alt="" src={calendar} />
                                    <h3 className='ml-[8px] lg:ml-[16px] text-[#8B8B8B] text-[14px] lg:text-[16px]'>Period <span className="text-[#6A6A6A] px-[10px] lg:px-[12px]">{this.state.placeholderStart.toDateString()} - {this.state.placeholderEnd.toDateString()}</span></h3>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-wrap bg-[#37B04C] mt-[31px] pt-[12px] pb-[11px] px-[12px] text-white items-center'>
                            <div className='uppercase basis-6/12 text-left text-[20px] font-bold'>market insight</div>
                            <div className=' basis-6/12 text-right underline'>Click Here for Help </div>
                        </div>
                        <div className='flex flex-wrap mt-[16px] px-[0.5rem] lg:px-[0rem]'>
                            <div className='w-full lg:w-[276px] h-[104px] bg-white shadow-[0px_2px_6px_#0000000A] px-[12px] pt-[12px]  '>
                                <div className='flex flex-wrap items-center'>
                                    <div className='basis-6/12'>
                                        <p className='text-[14px] leading-[16px] text-[#A1A0AE] tracking-[0.5px]'>Sales Turnover</p>
                                    </div>
                                    <div className='basis-6/12 flex items-center justify-end'>
                                        <img alt="" src={more} className="" />
                                    </div>
                                </div>
                                <div className='flex flex-wrap items-center'>
                                    <div className='basis-8/12'>
                                        <h3 className='text-[23px] font-bold'>Rp 3,600,000</h3>
                                        <p className='text-[10px] text-[#A1A0AE] '><span className='font-black text-[#FF4141] text-[11px]'>&darr; 13.8%</span> last period in products sold</p>
                                    </div>
                                    <div className='basis-4/12 flex justify-start'>
                                        <img alt="" src={cart} className="" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='flex flex-wrap mt-[16px]'>
                            <div className='basis-full lg:basis-6/12 h-[250px] lg:h-[424px] px-[0.5rem] lg:px-[0rem] lg:pr-[1rem]'>
                                <div className='w-full h-full bg-white shadow-[0px_2px_6px_#0000000A] border-[0.5px] border-[#CDCDCD] rounded-[2px]  px-[16px] py-[16px]'>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='basis-10/12'>
                                            <p className='text-[20px] leading-[13px] text-[#4D4F5C] font-nromal'>AVERAGE PURCHASE VALUE</p>
                                        </div>
                                        <div className='basis-2/12 flex items-center justify-end'>
                                            <img alt="" src={more} className="" />
                                        </div>
                                    </div>
                                    <div className="mt-[20px]">
                                        <Chart type='bar' data={data} />
                                    </div>
                                </div>
                            </div>
                            <div className='basis-full mt-[10px] lg:mt-[0px] lg:basis-3/12 h-[424px] px-[0.5rem] lg:px-[0rem]'>
                                <div className='w-full h-full bg-white shadow-[0px_2px_6px_#0000000A] border-[0.5px] border-[#CDCDCD] rounded-[2px] px-[16px] py-[16px]'>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='basis-10/12'>
                                            <p className='text-[20px] leading-[13px] text-[#4D4F5C] font-nromal'>BEST SELLING SKU</p>
                                        </div>
                                        <div className='basis-2/12 flex items-center justify-end'>
                                            <img alt="" src={more} className="" />
                                        </div>
                                        <div className="basis-full">
                                            {list}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='basis-full lg:basis-3/12 mt-[10px] lg:mt-[0px] h-[424px] px-[0.5rem] lg:pl-[1rem] lg:px-[0rem]'>
                                <div className='w-full h-full bg-white shadow-[0px_2px_6px_#0000000A] border-[0.5px] border-[#CDCDCD] rounded-[2px] px-[16px] py-[16px]'>
                                    <div className='flex flex-wrap items-center'>
                                        <div className='basis-10/12'>
                                            <p className='text-[20px] leading-[13px] text-[#4D4F5C] font-nromal'>Top Competitor SKU</p>
                                        </div>
                                        <div className='basis-2/12 flex items-center justify-end'>
                                            <img alt="" src={more} className="" />
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