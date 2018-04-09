import config from '../config';
import wepy from 'wepy'
function FetchHttpResource(host, actions) {
  var resource = {};
  Object.keys(Object.assign(actions)).forEach(function (actionName) {
    resource[actionName] = function (param) {
      var configs = {};
      var action = actions[actionName];
      var method = action.method;
      let url = host + action.url;
      let header = {
        'Content-type': action.contentType || 'application/x-www-form-urlencoded', // 默认值
        'authorization': '4444_dfa5ae132ecd4e23a6625013800295e2'
      };

      let params = Object.assign(action.params || {}, param);
      console.log("url", url)
      return new Promise((resolve, reject) => {
        let res = wepy.request({
          url:  url,
          method: method,
          header: header,
          data: params,
          success(data) {
           if(data.statusCode == 404) {
             wx.showToast({
               title: '页面不存在',
             })
           } else {
              resolve(data.data);
           }

          },
          fail(data) {

          }
        });
      });
    }
  });
  return resource;
}
const Api = new FetchHttpResource(config.host, {
  //getActivtiyallType: {method: "POST", url: "getActivtiyallType", params: {"id": 'f7262293-2f60-468f-8f9e-63fa6ddeda5e'}},
  //addActivtiyOrder:{method: "POST", url: "addActivtiyOrder",contentType:"application/json" },
    getinitLb:{method: "POST", url: "wx/main/lblist",params: {"jtStartIndex":0,"jtPageSize":10} },//首页初始化 轮播图
    getinitPd:{method: "POST", url: "wx/main/pdlist",params: {"jtStartIndex":0,"jtPageSize":3} },//首页品读
    getinitGsh:{method: "POST", url: "wx/main/userstory",params: {"jtStartIndex":0,"jtPageSize":6} },//首页品读
    userZPlist:{method: "POST", url: "wx/main/userZPlist",params: {"jtStartIndex":0,"jtPageSize":4} },//首页品读
    userSearchlist:{method: "POST", url: "wx/main/userlist",params: {"jtStartIndex":0,"jtPageSize":10} },//首页匠人搜索 人员搜索
    getnewUserstory:{method: "POST", url: "wx/article/getNewUserstory",params: {"jtStartIndex":0,"jtPageSize":6} },//得到最新故事
    getAlluserstory:{method: "POST", url: "wx/article/allUserstory",params: {"jtStartIndex":0,"jtPageSize":6}},//得到所有故事
    getPingdu:{method: "POST", url: "wx/article/getTypeWz",params: {"jtStartIndex":0}},//品读页面
    getZuoping:{method: "POST", url: "wx/zuoping/getTypeZp",params: {"jtStartIndex":0}},//作品页面
    getZuopingDetail:{method: "POST", url: "wx/zuoping/productDetial"},//作品详情页面
    getYishujia:{method: "POST", url: "wx/artist/list",params: {"jtStartIndex":1,"jtPageSize":4}},//匠人列表
    showSearchPage:{method: "POST", url: "wx/artist/searchPage",params: {"jtStartIndex":1,"jtPageSize":10}},//匠人搜索页面
    searchYsj:{method: "POST", url: "wx/artist/search",params: {"jtStartIndex":0,"jtPageSize":10}},//匠人名称搜索
    ysjHome:{method: "POST", url: "wx/artist/homePage",params: {"zp_pageSize":4,wz_pageSize:4}},//匠人首页
    ysjHomezp:{method: "POST", url: "wx/artist/getJrByUserZp",params: {zp_pageSize:4}},//匠人首页-作品分页
    ysjHomewz:{method: "POST", url: "wx/artist/getJrByUserWz",params: {wz_pageSize:4}},//匠人首页-文章分页
    findArticle:{method: "POST", url: "wx/article/find"},
    getToken:{method: "POST", url: "/wx/main/getToken"},
    saveToyuYueOrder:{method: "POST", url: "/wx/zuoping/saveOrder"}

})

export default Api;
