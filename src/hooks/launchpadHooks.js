export const getAllocationInfo = (actualBalance, userBalance, vestingInterval, vestingPercentage, initalClaimed) => {
    console.log("Vesting Balance : ", actualBalance, vestingInterval, vestingPercentage, initalClaimed)
    vestingInterval = vestingInterval * 24 * 60 * 60 * 1000;
    let vestingCount = parseFloat(1 / (parseFloat(vestingPercentage) / 100));
    const vestingBalance = parseFloat(actualBalance) - (parseFloat(actualBalance * vestingPercentage / 100) * vestingCount)
    console.log("Vesting Balance counyt :", vestingCount, vestingBalance)
    if (initalClaimed <= 0) {
        initalClaimed = Date.now() / 1000;
    }


    let allocations = [];
    for (var i = 0; i < vestingCount; i++) {
        const data = {
            no: i + 1,
            allocation: parseFloat(actualBalance * vestingPercentage / 100),
            unlockon: (i == 0) ? initalClaimed : parseFloat(initalClaimed) + (vestingInterval * (i)),
            isClaimed: (i == 0) ? (initalClaimed == Date.now()) : ((Date.now() >= parseFloat(parseFloat(initalClaimed) + (vestingInterval * (i))))),
            isDid: (i == 0) ? (parseFloat(actualBalance * vestingPercentage / 100) <= (actualBalance - userBalance)) : (parseFloat(actualBalance * vestingPercentage / 100) * (i + 1) <= (actualBalance - userBalance))
        };
        console.log("Alocation data : ", Date.now(), initalClaimed, vestingInterval, i, data.isClaimed, data.isDid, (parseFloat(actualBalance * vestingPercentage / 10000) * i, (actualBalance - userBalance)))
        allocations.push(data);
    }
    if (vestingBalance > 0) {
        const data = {
            no: (allocations.length) + 1,
            allocation: vestingBalance,
            unlockon: initalClaimed + (vestingInterval * (allocations.length) + 1),         
            isClaimed: (Date.now() >= parseFloat(initalClaimed + (vestingInterval * (allocations.length) + 1))),
            isDid: (parseFloat(actualBalance * vestingPercentage / 100) * (allocations.length) + 1) <= (actualBalance - userBalance)
        };
        allocations.push(data);
    }

    console.log("Allocation : ", allocations)
    return allocations;
}