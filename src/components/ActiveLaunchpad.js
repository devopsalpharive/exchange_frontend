import React, { useEffect, useState } from "react";

//Action
import { getLaunchpadList } from "../actions/launchpadAction";

//compment
import TokenCard from "../card/TokenCard";

const ActiveLaunch = () => {
    const [activeLaunch, setActiveLaunch] = useState([])
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    //   const [UpcomingLaunch, setUpcomingLaunch] = useState([])
    const fetchActiveLaunch = async (data) => {
        try {
            let { result, status, message, count } = await getLaunchpadList('active', data)
            console.log(result, 'fetchActiveLaunch')
            if (status) {
                setActiveLaunch((pervRecord) => {
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
            fetchActiveLaunch(reqData)
            setPage(Page)

        } catch (err) {
            console.log(err, 'LoadMore_Err')
        }
    }

    useEffect(() => {
        setActiveLaunch([])
        let reqData = {
            page: page,
            limit: limit
        }
        fetchActiveLaunch(reqData)
    }, [])
    return (
        <>
            <div className="row mt-5">
                {activeLaunch && activeLaunch.length > 0 && count != 0 ? (
                    activeLaunch.map((val) => {
                        console.log(val, 'activeLaunch', val.adminApproval == "approved" && val.status != "finalize" && val.status != "stop")
                        return (
                            val.adminApproval == "approved" && val.status != "finalize" && val.status != "stop" ?
                                (<>
                                    <div className="col-12 mb-4">
                                        <TokenCard
                                            val={val}
                                        // getlaunchpadList={getlaunchpadList}
                                        />
                                    </div>
                                </>
                                ) : (
                                    <></>
                                )
                        )
                    })
                ) :
                    (
                        <p className="text-center">No Data found</p>
                    )
                }
                {count > activeLaunch.length ?
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
            </div>
        </>
    )
}

export default ActiveLaunch;