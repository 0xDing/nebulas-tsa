/* eslint-disable import/newline-after-import */
import nebulas from 'nebulas';
const contractAddress="n22MQSjPQjhUWUEcwoDVmcUbUwyboDNRYj8";
const nebPay = new window.NebPay();
const Account = nebulas.Account;
const neb = new nebulas.Neb();
neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));


function validHash(hash) {
  let account = Account.NewAccount().getAddressString();
  return new Promise((resolve, reject) => {
    neb.api.call(account,contractAddress,"0","0","1000000","2000000",{
      "function": "get",
      "args": JSON.stringify([hash])
    }).then(function (resp) {
      let result = resp.result;    ////resp is an object, resp.result is a JSON string
      console.log("return of rpc call: " + JSON.stringify(result));
      resolve(result);
    }).catch(function (err) {
      console.log("error:" + err.message);
      reject(err);
    });
  });
}

function submit(hash) {
  hash = hash.trim();
  if (hash === "") {
    alert("empty hash");
  } else {
    window.serialNumber = nebPay.call(contractAddress, "0", "create", JSON.stringify([hash]), {    //使用nebpay的call接口去调用合约,
      listener: cbPush        //设置listener, 处理交易返回信息
    });
    window.intervalQuery = setInterval(function () {
      funcIntervalQuery(hash);
    }, 15000);
  }
}

function funcIntervalQuery(hash) {
  nebPay.queryPayInfo(window.serialNumber)   //search transaction result from server (result upload to server by app)
    .then(function (resp) {
      console.log("tx result: " + resp);   //resp is a JSON string
      let respObject = JSON.parse(resp);
      if(respObject.code === 0){
        alert(`create ${hash} succeeded!`);
        clearInterval(window.intervalQuery);
      }
    })
    .catch(function (err) {
      console.log(err);
      alert('some error occurred please check console log.');
    });
}

function cbPush(resp) {
  console.log("response of push: " + JSON.stringify(resp));
}


export {
  validHash,
  submit
};
