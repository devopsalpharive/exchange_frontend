import React, { useEffect, useState } from "react";

//Action
import { getLaunchpadList } from "../actions/launchpadAction";

//compment
import TokenCard from "../card/TokenCard";

const UpcomingLaunch = () => {
    const [upcomingLaunch, setUpcomingLaunch] = useState([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    //   const [UpcomingLaunch, setUpcomingLaunch] = useState([])
    const fetchUpcomingLaunch = async (data) => {
        try {
            let { result, status, message, count } = await getLaunchpadList('upcoming', data)
            if (status) {
                setUpcomingLaunch((pervRecord) => {
                    return [...pervRecord, ...result]
                })
                setCount(count)
            }
        } catch (err) {
            console.log(err, 'ActiveLaunch___err')
        }
    }

    const LoadMore = () => {
        try {
            let Page = page + 1
            let reqData = {
                page: Page,
                limit: limit
            }
            fetchUpcomingLaunch(reqData)
            setPage(Page)

        } catch (err) {
            console.log(err, 'LoadMore_Err')
        }
    }

    useEffect(() => {
        setUpcomingLaunch([])
        let reqData = {
            page: page,
            limit: limit
        }
        fetchUpcomingLaunch(reqData)
    }, [])
    return (
        <>
            <div className="row mt-5">
                {upcomingLaunch && upcomingLaunch.length > 0 && count != 0 ? (
                    upcomingLaunch.map((val) => {
                        return (
                            val.adminApproval == "approved" ?
                                (
                                    <div className="col-12 mb-4">
                                        <TokenCard
                                            val={val}
                                        // getlaunchpadList={}
                                        />
                                    </div>
                                ) : (
                                    <></>
                                )
                        )
                    })
                ) : (
                    <p className="text-center">No Data found</p>
                )
                }
                {count > upcomingLaunch.length ?
                    <div className="mt-5 d-flex justify-content-center">
                        <button
                            className="home__gradClipBtn "
                            onClick={() => { LoadMore() }}>
                            Load More
                        </button>
                    </div> :
                    ""}
                {/* {launchpad && launchpad.length > 0 && launchpadCount != 0 ? (
                    launchpad.map((val) => {
                        console.log(val, 'launchpad___val')
                        return (
                            val.launchStatus == "Active" &&
                                val.adminApproval == "approved" &&
                                val.status != "finalize" && val.status != "stop" ? (
                                <div className="col-12 mb-4">
                                    <TokenCard
                                        val={val}
                                        getlaunchpadList={getlaunchpadList}
                                    />
                                </div>
                            ) : (
                                <></>
                            )
                        )
                    }

                    )
                ) : (
                    <p className="text-center">No Data found</p>
                )} */}
            </div >
        </>
    )
}

export default UpcomingLaunch;