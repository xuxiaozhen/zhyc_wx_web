// 所 有 接 口 的 前 缀 （服务器————不带项目名）
export const SERVER_URL_WITHOUT_PRONAME = 'http://192.168.0.203:9003'
// 所 有 接 口 的 前 缀 （服务器）
export const SERVER_URL = 'http://192.168.0.203:9003/zhyc'

// 党校相关接口 (微党课、专题教育)
export const ARTICLELIST = SERVER_URL + '/smallProgram/articleList?pageSize=4'

// 新闻相关接口（党建要闻、通知公告、党内公示、党史人物）
export const ABOUTPARTY = SERVER_URL + '/smallProgram/articleList?type=1'

// 所有文章的详情接口
export const ARTICLEINFO = SERVER_URL + '/smallProgram/articleData'
// 文章浏览记录接口
export const ARTICLE_WATCH_RECORD = SERVER_URL + '/smallProgram/insertReadArticle'
// 文章浏览时间接口
export const ARTICLE_WATCH_TIME = SERVER_URL + '/smallProgram/updateReadArticleTime'

/* ============ 考试相关接口 start=================== */

// 考试列表
export const TEST_LIST = SERVER_URL + '/smallProgram/queryPersonExamInfo'
// 考试详情（具体的考试题目）
export const TESTINFO = SERVER_URL + '/smallProgram/queryExamInfo'
// 保存答案
export const SAVETEST = SERVER_URL + '/smallProgram/queryExamInfo'

/* ============ 考试相关接口 end===================== */

// 登录接口
export const LOGIN = SERVER_URL + '/login/wxLogin'
// 获取主页的所有图标
export const HOMEICONS = SERVER_URL + '/cdgl/mainMenu'
// 编辑主页的所有图标页面接口
export const EDITMOREICONS = SERVER_URL + '/cdgl/mainMenu2'
//添加某个图标
export const DELETEICON = SERVER_URL + '/cdgl/deleteMenu'
//删除某个图标
export const ADDICON = SERVER_URL + '/cdgl/addMenu'

// “三会一课” 会议消息列表接口
export const THREE_LESSON = SERVER_URL + '/smallProgram/meetingMesssageList'
//"三会一课" 会议通知列表接口
export const THREE_LESSONNOTE = SERVER_URL + '/smallProgram/meetingNoticeList'
//三会一课会议消息详情接口
export const THREELESSONINFO = SERVER_URL +'/smallProgram/meetingNoticeData'

// “已读详情” 详情接口
export const READCOUNT = SERVER_URL + '/smallProgram/meetingNoticeDataRead'

// “签到详情” 详情接口
export const QIANDAOCOUNT = SERVER_URL + '/smallProgram/meetingNoticeDataSign'
//更新三会一课会议通知接口
export const THREELESSONMEETNOTE = SERVER_URL +'/smallProgram/updateMeetingNoticeState'

//投票调研列表接口
export const POLING = SERVER_URL +'/vote/query_tpdy_cytplb'
//“投票调研详情”接口
export const POING_INFO = SERVER_URL +'/vote/query_tpdy_tpxq'
//参与投票接口
export const GOTOPOING = SERVER_URL +'/vote/update_tpdy_cytp'

// “我的心声” 列表接口
export const MYHEART = SERVER_URL + '/feedback/query_wdxs_fklb'
// “我的心声” 详情接口
export const MYHEARTMSG = SERVER_URL + '/feedback/query_ygxs_fkxq'
//我的心声新增接口
export const ADDHEART=SERVER_URL+'/feedback/insert_wdxs_xz'

// “我的积分” 详情接口
export const MYINTEGRAL = SERVER_URL + '/smallProgram/myIntegralList'

//获取相册列表
export const ALBUM = SERVER_URL + '/smallProgram/photoList'
//新增相册接口
export const ADD_ALBUM = SERVER_URL + '/smallProgram/insert_wdxs_xz'
//照片列表接口
export const PICTURE = SERVER_URL +'/smallProgram/lookdetailsList'
//添加照片列表
export const ADDPICTURE = SERVER_URL +'/fileAction/uploadPics'

//党员档案
export const PARTYNUMBER_INFO = SERVER_URL + '/userManage/queryUserParty'
//党员档案详情

//党员考评接口
export const EXAMINATION = SERVER_URL +'/smallProgram/queryEvaluationScore'

// “任务管理” 详情接口
export const TASKMANAGEMENT = SERVER_URL + '/smallProgram/individualTasksStatistical'

// “课程学习” 详情接口
export const LESSONLEARN = SERVER_URL +'/smallProgram/individualTasksStatisticalPartyLecture'

// “年度专题” 列表接口
export const YEARCONTENT = SERVER_URL + '/smallProgram/individualTasksStatisticalReadArticle'

// “会议详情” 列表接口
export const MEETMANY = SERVER_URL + '/smallProgram/individualTasksStatisticalMeeting'


export const PARTYNUMBER = SERVER_URL + '/userManage/queryPartyList'
