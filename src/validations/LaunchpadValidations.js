/** Packages */
// import {isEmpty} from "../lib/isEmpty";
import isEmpty from "is-empty"

export const launchpadValidations = (data, level) => {
    try {
        console.log(data, 'launchpadValidations')
        let regexQuery = "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
        let urlRegx = new RegExp(regexQuery, "i");
        let error = {}
        if (level == 2) {
            if (isEmpty(data.presaleRate) || data.presaleRate == 0) {
                error.presaleRate = "* PresaleRate is required"
            } if (isEmpty(data.whitelistSale)) {
                error.whitelistSale = "* WhitelistSale is required"
            } if (isEmpty(data.softCap) || data.softCap == 0) {
                error.softCap = "* SoftCap is required"
            } else if (parseFloat(data.softCap) > parseFloat(data.hardCap)) {
                error.softCap = "*Soft cap must be less than hard cap"
            } else if (parseFloat(data.hardCap) / 2 != parseFloat(data.softCap)) {
                error.softCap = "*Soft Cap must be = 50% of Hard Cap"
            } if (isEmpty(data.hardCap) || data.hardCap == 0) {
                error.hardCap = "* HardCap is required"
            } else if (parseFloat(data.hardCap) < parseFloat(data.softCap)) {
                error.hardCap = "*Hard cap must be greater than soft cap"
            }
            if (isEmpty((data.minimum)) || data.minimum == 0) {
                error.minimum = "* Minimum is required"
            } else if (parseFloat(data.minimum) > parseFloat(data.hardCap)) {
                error.minimum = "* Minimum should be less than the hard cap"
            }
            if (isEmpty(data.maximum) || data.maximum == 0) {
                error.maximum = "* Maximum is required"
            } else if (parseFloat(data.minimum) > parseFloat(data.maximum)) {
                error.maximum = "* Minimum should be less than the maximum ."
            } else if (parseFloat(data.maximum) > parseFloat(data.hardCap)) {
                error.maximum = "* Maximum should be less than the hard cap"
            }
            if (!isEmpty(data.listingOptions) && data.listingOptions == 'auto') {
                // if (isEmpty(data.lockingdays) || data.lockingdays == 0) {
                //     error.lockingdays = "* Lockingdays is required"
                // }
                if (isEmpty(data.listingPrice) || data.listingPrice == 0) {
                    error.listingPrice = "* ListingPrice is required"
                }
            } if (isEmpty(data.startTime) || data.startTime == 0) {
                error.startTime = "* StartTime is required"
            } else if (parseFloat(data.startTime) > parseFloat(data.endTime)) {
                error.startTime = "*Start time must be less than end time"
            } if (isEmpty(data.endTime) || data.endTime == 0) {
                error.endTime = "* EndTime is required"
            } else if (parseFloat(data.endTime) < parseFloat(data.startTime)) {
                error.endTime = "*End time must be greater than start time"
            } if (data.isVested) {
                if (isEmpty(data.vestingPeriod) || data.vestingPeriod == 0) {
                    error.vestingPeriod = "* VestingPeriod is required"
                } if (isEmpty(data.vestingPercentage) || data.vestingPercentage == 0) {
                    error.vestingPercentage = "* VestingPercentage is required"
                }
            }

        } else if (level == 3) {
            if (isEmpty(data.bannerurl)) {
                error.bannerurl = "* bannerurl is required"
            }
            if (isEmpty(data.logoUrl)) {
                error.logoUrl = "* LogoUrl is required"
            } if (isEmpty(data.whitepaper)) {
                error.whitepaper = "* Whitepaper is required"
            } if (isEmpty(data.website)) {
                error.website = "* Website is required"
            } if (isEmpty(data.facebook)) {
                error.facebook = "* Facebook is required"
            } if (isEmpty(data.twitter)) {
                error.twitter = "* Twitter is required"
            } if (isEmpty(data.github)) {
                error.github = "* Github is required"
            } if (isEmpty(data.telegram)) {
                error.telegram = "* Telegram is required"
            } if (isEmpty(data.instagram)) {
                error.instagram = "* Instagram is required"
            } if (isEmpty(data.discord)) {
                error.discord = "* Discord is required"
            } if (isEmpty(data.reddit)) {
                error.reddit = "* Reddit is required"
            } if (isEmpty(data.youtube)) {
                error.youtube = "* Youtube is required"
            } if (!isEmpty(data.telegram) && !urlRegx.test(data.telegram)) {
                error.telegram = "* Enter a valid url"
            } if (!isEmpty(data.bannerurl) && !urlRegx.test(data.bannerurl)) {
                error.bannerurl = "* Enter a valid url"
            } if (!isEmpty(data.website) && !urlRegx.test(data.website)) {
                error.website = "* Enter a valid url"
            } if (!isEmpty(data.facebook) && !urlRegx.test(data.facebook)) {
                error.facebook = "* Enter a valid url"
            } if (!isEmpty(data.twitter) && !urlRegx.test(data.twitter)) {
                error.twitter = "* Enter a valid url"
            } if (!isEmpty(data.github) && !urlRegx.test(data.github)) {
                error.github = "* Enter a valid url"
            } if (!isEmpty(data.instagram) && !urlRegx.test(data.instagram)) {
                error.instagram = "* Enter a valid url"
            } if (!isEmpty(data.discord) && !urlRegx.test(data.discord)) {
                error.discord = "* Enter a valid url"
            } if (!isEmpty(data.reddit) && !urlRegx.test(data.reddit)) {
                error.reddit = "* Enter a valid url"
            } if (!isEmpty(data.youtube) && !urlRegx.test(data.youtube)) {
                error.youtube = "* Enter a valid url"
            }
            // if (isEmpty(data.description)) {
            //     error.description = "* Description is required"
            // }
        }
        else if (level == 4) {
            if (isEmpty(data.description)) {
                error.description = "* Description is required"
            } if (isEmpty(data.terms)) {
                error.terms = "* Terms and condition is required"
            } if (isEmpty(data.currentSelectTheme)) {
                error.currentSelectTheme = "* Terms and condition is required"
            }
        }
        else if (level == 5 && data.currentSelectTheme == '2') {
            if (isEmpty(data.contentOne)) {
                error.contentOne = "* content is required"
            } if (isEmpty(data.contentOneImg)) {
                error.contentOneImg = "* content image  is required"
            } if (isEmpty(data.contentOneTit)) {
                error.contentOneTit = "* content title is required"
            }
        }
        else if (level == 5 && data.currentSelectTheme == '3') {
            if (isEmpty(data.contentOne)) {
                error.contentOne = "* content one is required"
            } if (isEmpty(data.contentOneImg)) {
                error.contentOneImg = "* content one image  is required"
            } if (isEmpty(data.contentOneTit)) {
                error.contentOneTit = "* content one title is required"
            }
            if (isEmpty(data.contentTwo)) {
                error.contentTwo = "* content two is required"
            } if (isEmpty(data.contentTwoImg)) {
                error.contentTwoImg = "* content two image  is required"
            } if (isEmpty(data.contentTwoTit)) {
                error.contentTwoTit = "* content two title is required"
            }
        }
        else {
            console.log("****************");
        }
        return Object.keys(error).length > 0 ? { status: true, error } : { status: false, error }
    } catch (e) {
        console.log("launchpadValidations_err", e);
    }
}