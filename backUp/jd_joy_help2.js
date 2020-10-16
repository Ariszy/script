/**
宠汪汪强制为别人助力（助力一个好友你自己可以获得30积分，一天上限是帮助3个好友，自己获得90积分，不管助力是否成功，对方都会成为你的好友）
更新地址：https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_help.js
更新时间：2020-08-28
目前提供了304位好友的friendPin供使用。脚本随机从里面获取一个，助力成功后，退出小程序重新点击进去开始助力新的好友
欢迎大家使用 https://jdjoy.jd.com/pet/getFriends?itemsPerPage=20&currentPage=1 (currentPage=1表示第一页好友，=2表示第二页好友)
提供各自账号列表的friendPin给我
如果想设置固定好友，那下载下来放到本地使用，可以修改friendPin换好友(助力一好友后，更换一次friendPin里面的内容)
感谢github @Zero-S1提供
使用方法：
①设置好相应软件的重写
②从京东APP宠汪汪->领狗粮->邀请好友助力，分享给你小号微信或者微信的文件传输助手。 自己再打开刚才的分享，助力成功后，退出小程序重新进去刚才分享的小程序即可
③如提示好友人气旺，说明此好友已满了三人助力，需重新进出小程序，重新进入来客有礼-宠汪汪。
[MITM]
hostname = draw.jdfcloud.com
surge
[Script]
宠汪汪强制为别人助力= type=http-request,pattern=(^https:\/\/draw\.jdfcloud\.com\/\/pet\/enterRoom\?reqSource=weapp&invitePin=.*+(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?|^https:\/\/draw\.jdfcloud\.com\/\/pet\/helpFriend\?friendPin),requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_help.js

圈x
[rewrite_local]
^https:\/\/draw\.jdfcloud\.com\/\/pet\/enterRoom\?reqSource=weapp&invitePin=.*+(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?|^https:\/\/draw\.jdfcloud\.com\/\/pet\/helpFriend\?friendPin url script-request-header https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_help.js

 LOON：
[Script]
http-request ^https:\/\/draw\.jdfcloud\.com\/\/pet\/enterRoom\?reqSource=weapp&invitePin=.*+(&inviteSource=task_invite&shareSource=\w+&inviteTimeStamp=\d+&openId=\w+)?|^https:\/\/draw\.jdfcloud\.com\/\/pet\/helpFriend\?friendPin script-path=https://raw.githubusercontent.com/lxk0301/scripts/master/jd_joy_help.js
, requires-body=true, timeout=10, tag=宠汪汪强制为别人助力


你也可从下面链接拿好友的friendPin(复制链接到有京东ck的浏览器打开即可)

https://jdjoy.jd.com/pet/getFriends?itemsPerPage=20&currentPage=1
**/
let url = $request.url
const friendsArr = ["jd_136833sjn","jd_131335rbv","jd_4f044bdd67a3f","jd_176968gwf","jd_136744uks","jd_139559isq","jd_151698nhe","jd_182775ekl","jd_139643ldl","jd_159166edm","jd_157100apb","jd_131843tvo","jd_152554vhs","jd_134283prpb","jd_139988mgfo","jd_133590dtg","jd_63636969e55cb","jd_135565fsg","jd_189071npd","jd_138430zvw","jd_139582hlp","jd_815411720","jd_157642zjc","jd_177753pzb","jd_137918wwl","jd_188675alaf","jd_186718otu","jd_139139bew","jd_180436ggd","jd_52315d900a88a","jd_137689rjx","jd_151106nxb","jd_153879dzp","jd_185840vwq","jd_6194e9ae2cebf","jd_186221rph","jd_153810ylu","jd_189288egp","jd_158791okv","jd_139132erd","jd_159304acn","jd_138899zum","jd_187182akf","jd_136324bjqi","jd_131616wdo","jd_155384iof","jd_186326vtm","jd_zoezhu","jd_135075ahc","jd_138141ill","jd_139773zbm","jd_158416jwas","jd_182328ujc","jd_135999wrw","jd_181325tmk","jd_188254zgv","jd_3712425","jd_153711hhx","jd_176020ylg","jd_136436iuk","jd_180430yxp","jd_159958jmr","jd_155382wjy","jd_135819ueh","jd_132125ish","jd_181196mrhz","jd_138403wnm","jd_181568lrk","jd_155785zic","jd_150712koi","jd_137012gwu","jd_137638siy","jd_183011sph","jd_158224asm","jd_1652541161","jd_137332lgt","jd_181991fgs","jd_189347opuc","jd_181898rlw","jd_136526chs","jd_152616rsg","jd_151410rti","jd_139657jxa","jd_187978fdq","jd_136039csx","jd_186029urn","jd_138681pjy","jd_138204hpd","jd_138246wgz","jd_131177aol","jd_182100ofj","jd_282335851","jd_180210xwj","jd_139400bou","jd_189751xfv","jd_133781olg","jd_155229qbl","jd_dady_a","jd_183890opj","jd_136830xsh","jd_138731rkth","jd_135476kin","jd_3302023","jd_suns932","jd_158958xju","jd_688050784","jd_177467uaf","jd_138950cao","jd_181726mer","jd_138194nvx","jd_2010wwk","jd_139295gxw","jd_173931eeb","jd_189713iss","jd_139894msf","jd_158767vct","jd_159210nml","jd_133230bpy","jd_150771igh","jd_4c9dced2ff301","jd_133025pjb","jd_184751jlf","jd_139379bhj","jd_4900071","jd_137188nnv","jd_153678kxr","jd_6b04334c27336","jd_185217cfd","jd_155892hhe","jd_gxq721","jd_duqing821","jd_185087idh","jd_181528ojs","jd_136778wigm","jd_137903zfgq","jd_134785qjj","jd_159536nii","jd_188492aqx","jd_152226ypk","jd_183815eio","jd_139250pva","jd_151739nli","jd_135202pbl","jd_138201yhi","jd_137642nzw","jd_136600ysr","jd_138220eom","jd_178595cqf","jd_186682kjk","jd_136205srq","jd_138820xtj","jd_152322tkj","jd_150225ipi","jd_133287tje","jd_guba01","jd_187568qui","jd_158753hfl","jd_159816boe","jd_139297psw","jd_138564ibo","jd_188105wjm","jd_180199ekd","jd_134164zgp","jd_181547miy","jd_137030gdm","jd_183197ekf","jd_155187jhm","jd_158363nbzh","jd_151335bxo","jd_139616ywb","jd_156600kfm","jd_352215391","jd_620475312","jd_137997ole","jd_186060jol","jd_7824770b3d748","jd_6b8ba51989353","jd_152712oax","jd_177413lgq","jd_134172lqw","jd_135035dya","jd_135388arv","jd_135013mbs","jd_150897xln","jd_133827ois","jd_133307ffi","jd_138326tzrx","jd_186639utz","jd_Thin779","jd_137173yni","jd_159843fjq","jd_152590bui","jd_180225wpx","jd_187579piq","jd_156758shb","jd_139960nex","jd_138817fsp","jd_181696mtg","jd_137911aamo","jd_135891nxk","jd_177761izc","jd_153337fyq","jd_114559761","jd_Xsgfsj","jd_139965zpe","jd_185459vvx","jd_189214its","jd_151615dmb","jd_138460bsc","jd_138618yqc","jd_187290mur","jd_151318bht","jd_155344pmg","jd_137302fjz","jd_182505eyw","jd_136416nan","jd_151651ncw","jd_137131dya","jd_133471mru","jd_181116wrh","jd_139819ahg","jd_138219eja","jd_136695iqb","jd_158215wjb","jd_107071797","jd_155664eni","jd_182384yok","jd_139611sco","jd_157652hlh","jd_137036vhs","jd_188476ctf","jd_178651ldby","jd_158107bvn","jd_150342aox","jd_137332lgt","jd_150283rncu","jd_131367qhs","jd_133052bem","jd_189317gau","jd_134186sbh","jd_138637pbp","jd_glwang2","jd_189557iiq","jd_138906xlbm","jd_152360yuk","jd_134551yla","jd_135832apl","jd_4f044bdd67a3f","jd_155448yab","jd_138388paz","jd_138817fsp","jd_1352513187","jd_135464sqz","jd_153298yxo","jd_139208nicz","jd_136608wyr","jd_133053kbn","jd_135034bbx","jd_2133952","jd_187382exm","jd_131843tvo","jd_135063kvb","jd_130844lme","jd_137295ajrg","jd_136810xds","jd_182771zcmi","jd_qwertag13568370gf","jd_爱在鹭上","jd_189200fiu","jd_159871grf","jd_q105946","jd_182028tnj","jd_153718opj","jd_136850dhv","jd_159162dxb","jd_155267dkh","jd_泽修","jd_4f044bdd67a3f","jd_152763ghe","jd_137104jyuf","jd_136426poa","jd_153920qlg","jd_136324bjqi","jd_159715spj","jd_135772nxy","jd_321051","jd_fanm537","jd_小小李仔","jd_137104vuum","jd_177212uid","jd_150312pgc","jd_152569xgz","jd_136994ddl","jd_186223kew","jd_139779ovt","jd_181193dok","jd_189461sem","jd_138245yum","jd_134136kgip","jd_189543hpt","jd_132180xif","jd_182857oox","jd_186245aal","jd_3555750","jd_188502cqy","jd_186910cwu","jd_182829qbch","jd_182297xcme","jd_159708cng","jd_133330ift","jd_131904zwu","jd_182801xpy","jd_150075wud","jd_156874jup","jd_189964qzl","jd_158132cle","jd_sun723","jd_182176mee","jd_188503acjo","jd_158537jdm","jd_159485zvu","jd_淡人","jd_180011ejj","jd_135829xzp","jd_136921jpe","jd_迷墙之外","jd_152629pmx","jd_189710eck","jd_189397oeo","jd_189592sul","jd_150576adh","jd_159411rzd","jd_134601izn","jd_180053tsa","jd_o喕苞o","jd_138226cmgb","jd_183757gbgp","jd_139289bij","jd_lx_a","jd_7f019*****340","jd_138562oek","jd_偶尔间","jd_183691xyg","jd_151429qhv","jd_139804lhb","jd_136042bzg","jd_138102ldq","jd_135986nkf","jd_truman","jd_181700kju","jd_151064dhx","jd_150907ahj","jd_186652jxh","jd_587*****03976","jd_418fef3fab12f","jd_159527gqz","jd_138237dcn","jd_134119thub","jd_wrrr0","jd_180498ozp","jd_138531irs","jd_131136fru","jd_185228tkh","jd_131910jzm","jd_151063mhz","jd_58096918e5234","jd_187187rvl","jd_157537jpe","jd_6cebe25400109","jd_1175189","jd_42a743e0b8651","jd_153063yds", "jd_177692lwq","jd_152020gzy","jd_138898puv","jd_155525lpff","jd_151123xea","jd_2672389178","jd_178258cff","jd_158191ansh","jd_153280zoy","jd_hl31450","jd_150416qyl"];
function randomFriendPin(m,n) {
  return Math.floor(Math.random()*(m - n) + n);
}
let friendPin = friendsArr[randomFriendPin(0, friendsArr.length - 1)]  //强制为对方助力,可成为好友关系
friendPin = encodeURI(friendPin);
const timestamp = new Date().getTime()
newUrl = url.replace(/friendPin=.*?$/i, "friendPin=" + friendPin).replace(/invitePin=.*?$/i, "invitePin=" + friendPin).replace(/inviteTimeStamp=.*?$/i, "inviteTimeStamp=" + timestamp + "&")
console.log(newUrl)
$done({ url: newUrl })
