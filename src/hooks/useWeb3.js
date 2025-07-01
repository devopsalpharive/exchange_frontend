/** Packages */
import Web3 from 'web3';
import isEmpty from 'is-empty';

/** Config */
import { ERC20_ABI } from '../config/ERC20';
import { toFixedNumber } from '../config/lib';



/** Create WEB3 instance */
export const UseWeb3 = async (rpc) => {
    try {
        // Create a instance using web3 node
        const httpProvider = new Web3.providers.HttpProvider(rpc);
        const web3 = new Web3(httpProvider);
        return web3;
    } catch (e) {
        console.log("useWeb3_err", e);
        return false
    }
}


export const UseTokenInfo = async (rpc, address) => {
    console.log("tokenInfo_address", rpc, address);
    try {
        const web3 = await UseWeb3(rpc)
        const token = await new web3.eth.Contract(ERC20_ABI, address);
        const name = await token.methods.name().call(); // Token Name
        const symbol = await token.methods.symbol().call(); // Token Symbol
        const decimals = await token.methods.decimals().call(); // Token Decimal
        let totalSupply = await token.methods.totalSupply().call(); // Token totalSuppply
        totalSupply = toFixedNumber(totalSupply / 10 ** decimals)
        console.log("useTokenInfo", { name, symbol, decimals,totalSupply });
        return { status: true, name: name, symbol: symbol, decimals: decimals, totalSupply };
    }
    catch (e) {
        console.log("useTokenInfo_err", e);
        return { status: false }
    }
}