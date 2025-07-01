import { isEmpty } from '../lib/isEmpty'

export const tokenCreateRequestValidation = async (data, currentTab) => {
    try {
        console.log(data, 'tokenCreateRequestValidation')
        let emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let regexQuery = "^(https?:\\/\\/)?((([-a-z0-9]{1,63}\\.)*?[a-z0-9]([-a-z0-9]{0,253}[a-z0-9])?\\.[a-z]{2,63})|((\\d{1,3}\\.){3}\\d{1,3}))(:\\d{1,5})?((\\/|\\?)((%[0-9a-f]{2})|[-\\w\\+\\.\\?\\/@~#&=])*)?$";
        let urlRegx = new RegExp(regexQuery, "i");
        let error = {
            projectInformation: {},
            tokenDetails: {},
            projectTeam: {},
            companyLegalDetails: {},
            technology: {},
            tokenomics: {},
            regularCompliance: {},
            roadmapAndMilestone: {},
            communityEngagement: {},
            contactInformations: {},
            useCase: {},
            partnershipAndCollaborions: {}
        }

        if (currentTab == 1) {
            /** Project-Information */
            if (isEmpty(data.projectInformation.projectName)) {
                error.projectInformation.projectName = '* Project Name is required'
            } if (isEmpty(data.projectInformation.projectWebsite)) {
                error.projectInformation.projectWebsite = '* Project Website is required'
            } else if (!urlRegx.test(data.projectInformation.projectWebsite)) {
                error.projectInformation.projectWebsite = '* Invalid project website url '
            } if (isEmpty(data.projectInformation.whitepaper)) {
                error.projectInformation.whitepaper = '* Whitepaper is required'
            } else if (!urlRegx.test(data.projectInformation.whitepaper)) {
                error.projectInformation.whitepaper = '* Invalid whitepaper url '
            } if (isEmpty(data.projectInformation.description)) {
                error.projectInformation.description = '* Description is required'
            } if (!isEmpty(data.projectInformation.projectWebsite) && !urlRegx.test(data.projectInformation.projectWebsite)) {
                error.projectInformation.projectWebsite = '* Enter a valid Project Website'
            } if (!isEmpty(data.projectInformation.whitepaper) && !urlRegx.test(data.projectInformation.whitepaper)) {
                error.projectInformation.whitepaper = '* Enter a valid whitepaper'
            }

            /** Token-Details */
            if (isEmpty(data.chain)) {
                error['chain'] = '*Currency is required'
            }
            if (isEmpty(data.tokenDetails.tokenName)) {
                error.tokenDetails.tokenName = '* Token Name is required'
            } if (isEmpty(data.tokenDetails.tokenSymbol)) {
                error.tokenDetails.tokenSymbol = '* Token Symbol Website is required'
            } if (isEmpty(data.tokenDetails.tokenDecimal) || data.tokenDetails.tokenDecimal == 0) {
                error.tokenDetails.tokenDecimal = '* Token Decimal is required'
            } if (isEmpty(data.tokenDetails.tokenType) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.tokenDetails.tokenType = '* Token Type is required'
            } if (isEmpty(data.tokenDetails.tokenTotalSupply)) {
                error.tokenDetails.tokenTotalSupply = '* Token Total Supply is required'
            } if (isEmpty(data.tokenDetails.tokenContractAddress) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.tokenDetails.tokenContractAddress = '* Token Contract Address is required'
            } if (isEmpty(data.tokenDetails.reissuable) && data.type == 'newToken') {
                error.tokenDetails.reissuable = '* Reissuable is required'
            }if (isEmpty(data.tokenDetails.tokenCirculatingSupply) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.tokenDetails.tokenCirculatingSupply = '* Token Circulating Supply is required'
            }

            /** Project-Team */
            // if (isEmpty(data.projectTeam.teamName)) {
            //     error.projectTeam.teamName = '* ProjectName is required'
            // } if (isEmpty(data.projectTeam.linkedInProfile)) {
            //     error.projectTeam.linkedInProfile = '* LinkedInProfile is required'
            // } if (isEmpty(data.projectTeam.releventExperience)) {
            //     error.projectTeam.releventExperience = '* ReleventExperience is required'
            // }

            let projectTeamError = []
            data.projectTeam.map((val, i) => {
                let obj = {}
                if (isEmpty(val.teamName)) {
                    obj['teamName'] = '* Project Name is required'
                } if (isEmpty(val.linkedInProfile)) {
                    obj['linkedInProfile'] = '* Linked InProfile is required'
                } if (!isEmpty(val.linkedInProfile) && !urlRegx.test(val.linkedInProfile)) {
                    obj['linkedInProfile'] = '* Enter a valid linkedInProfile.'
                } if (isEmpty(val.releventExperience)) {
                    obj['releventExperience'] = '* Relevent Experience is required'
                } if (isEmpty(val.role)) {
                    obj['role'] = '* Role is required'
                }
                projectTeamError.push(obj)
            });

            if (projectTeamError.map((value, index) => isEmpty(value).toString()).includes('false')) {
                error.projectTeam = projectTeamError
            }

            /** Company-LegalDetails */
            if (isEmpty(data.companyLegalDetails.companyName)) {
                error.companyLegalDetails.companyName = '* Company Name is required'
            } if (isEmpty(data.companyLegalDetails.companyEntityName)) {
                error.companyLegalDetails.companyEntityName = '* Company EntityName is required'
            } if (isEmpty(data.companyLegalDetails.companyEntityType) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.companyLegalDetails.companyEntityType = '* Company EntityType is required'
            } if (isEmpty(data.companyLegalDetails.countryOfRegistration)) {
                error.companyLegalDetails.countryOfRegistration = '* Rountry Of Registration is required'
            } if (isEmpty(data.companyLegalDetails.countryOfRegistration)) {
                error.companyLegalDetails.countryOfRegistration = '* Country Of Registration is required'
            } if (isEmpty(data.companyLegalDetails.companyAddress)) {
                error.companyLegalDetails.companyAddress = '* Company Address is required'
            } if (isEmpty(data.companyLegalDetails.communicationAddress)) {
                error.companyLegalDetails.communicationAddress = '* Communication Address is required'
            } if (isEmpty(data.companyLegalDetails.phoneNumber)) {
                error.companyLegalDetails.phoneNumber = '* Phone Number is required'
            } if (isEmpty(data.companyLegalDetails.officialRepName)) {
                error.companyLegalDetails.officialRepName = '* Official RepName is required'
            } if (isEmpty(data.companyLegalDetails.officialRepno)) {
                error.companyLegalDetails.officialRepno = '* Official Repno is required'
            } if (isEmpty(data.companyLegalDetails.officialRepEmail)) {
                error.companyLegalDetails.officialRepEmail = '* Official RepEmail is required'
            } else if (!emailRegx.test(data.companyLegalDetails.officialRepEmail)) {
                error.companyLegalDetails.officialRepEmail = '*Invalid email'
            }
        } else if (currentTab == 2) {
            /** Technology */
            if (isEmpty(data.technology.type) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.type = '* Type is required'
            } if (isEmpty(data.technology.blockchainProtocol) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.blockchainProtocol = '* Blockchain Protocol is required'
            } if (isEmpty(data.technology.tokenStandrad) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.tokenStandrad = '* Token Standrad is required'
            } if (isEmpty(data.technology.consensusMechanism) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.consensusMechanism = '* Consensus Mechanism is required'
            } if (isEmpty(data.technology.mineable) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.mineable = '* Mineable is required'
            } if (isEmpty(data.technology.miningAlgorihm) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.miningAlgorihm = '* Mining Algorihm is required'
            } if (isEmpty(data.technology.contractLanguage) && (data.type == 'existing' || data.type == 'alreadyMinted')) {
                error.technology.contractLanguage = '* Contract Language is required'
            }


            /** Tokenomics */
            if (isEmpty(data.tokenomics.intialTokenDistribution)) {
                error.tokenomics.intialTokenDistribution = '* Intial Token Distribution is required'
            } if (isEmpty(data.tokenomics.tokenDistributionPlan)) {
                error.tokenomics.tokenDistributionPlan = '* Token Distribution Plan is required'
            } if (isEmpty(data.tokenomics.tokenReleaseSchedule)) {
                error.tokenomics.tokenReleaseSchedule = '* Token Release Schedule is required'
            }


            /** UseCase */
            if (isEmpty(data.useCase.targetType)) {
                error.useCase.targetType = '* Target Type is required'
            } if (isEmpty(data.useCase.competitors)) {
                error.useCase.competitors = '* Competitors is required'
            } if (isEmpty(data.useCase.apartFromCompletitors)) {
                error.useCase.apartFromCompletitors = '* Apart From Completitors is required'
            }


            /** RegularCompliance */
            if (isEmpty(data.regularCompliance.tokenRegulatoryStatus)) {
                error.regularCompliance.tokenRegulatoryStatus = '* Token Regulatory Status is required'
            } if (isEmpty(data.regularCompliance.competitors)) {
                error.regularCompliance.competitors = '* Competitors is required'
            }


            /** RoadmapAndMilestone */
            if (isEmpty(data.roadmapAndMilestone.developmentStage)) {
                error.roadmapAndMilestone.developmentStage = '* Development Stage is required'
            } if (isEmpty(data.roadmapAndMilestone.roadMaps) && data.type != 'newToken') {
                error.roadmapAndMilestone.roadMaps = '* Road Maps is required'
            }


            /** CommunityEngagement */
            if (isEmpty(data.communityEngagement.activitOfCommunity)) {
                error.communityEngagement.activitOfCommunity = '* Activit Of Community is required'
            } if (isEmpty(data.communityEngagement.support)) {
                error.communityEngagement.support = '* Support is required'
            }


            /** ContactInformations */
            if (isEmpty(data.contactInformations.contactPerson)) {
                error.contactInformations.contactPerson = '* Contact Person is required'
            } if (isEmpty(data.contactInformations.role)) {
                error.contactInformations.role = '* Role is required'
            } if (isEmpty(data.contactInformations.email)) {
                error.contactInformations.email = '* Email is required'
            } else if (!emailRegx.test(data.contactInformations.email)) {
                error.contactInformations.email = '*Invalid email'
            }
            if (isEmpty(data.contactInformations.phoneNumber)) {
                error.contactInformations.phoneNumber = '* Phone Number is required'
            }


            /** PartnershipAndCollaborions */
            if (isEmpty(data.partnershipAndCollaborions.strategicPartnerships)) {
                error.partnershipAndCollaborions.strategicPartnerships = '* Strategic Partnerships is required'
            } if (isEmpty(data.partnershipAndCollaborions.regulatoryCompliance) && data.type == "newToken") {
                error.partnershipAndCollaborions.regulatoryCompliance = '* Regulatory Compliance is required'
            }


            /** SecurityAndAudits */
            if (isEmpty(data.securityAndAudits) && data.type != 'newToken') {
                error.securityAndAudits = '* Security And Audits is required'
            }

            /** AdditionalInformations */
            if (isEmpty(data.additionalInformations) && data.type != 'newToken') {
                error.additionalInformations = '* Additional Informations is required'
            }
        }


        console.log(error, 'tokenCreateRequestValidation')
        return Object.values(error).map((value, index) => isEmpty(value).toString()).includes('false') ? { status: false, error } : { status: true, error: {} }

    } catch (e) {
        console.log("validation_err", e);
    }
}