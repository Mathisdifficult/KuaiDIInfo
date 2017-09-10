 var RequestData = "{'OrderCode':'','ShipperCode':'" + logistics[0] + "','LogisticCode':'" + logistics[1] + "'}"
        //utf-8编码的数据内容
        console.log(RequestData)
        var RequestDatautf = encodeURI(RequestData)
        console.log("RequestDatautf:" + RequestDatautf)
        //签名
        console.log(RequestData + 'apikey')
        var DataSign = encodeURI(util.Base64((util.md5(RequestData + 'apikey'))))
        console.log("DataSign:" + DataSign)
        if (logistics != null) {
          wx.request({
            url: 'https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx',
            data: {
              //数据内容(进行过url编码)
              'RequestData': RequestDatautf,
              //电商ID
              'EBusinessID': '商户id',
              //请求指令类型：1002
              'RequestType': '1002',
              //数据内容签名把（请求内容（未编码）+ApiKey）进行MD5加密，然后Base64编码，最后进行URL（utf-8）编码
              'DataSign': DataSign,
              //请求、返回数据类型： 2-json；
              'DataType': '2',
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              that.setData({ data: res.data.Traces })
            }
          })
        }