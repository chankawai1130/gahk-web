/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

const bcrypt = require('bcryptjs');

module.exports.bootstrap = async function (done) {

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)

  const admin = await User.findOne({ Username: 'admin1' });
  if (!admin) {
    await User.create({ Username: 'admin1', Password: await bcrypt.hash('hkbu123456', 10), role: 'admin', ChiName: '管理員', EngName: 'Administrator', Email: 'kenny@admin.com', Date: new Date() });
    await User.create({ Username: 'admin2', Password: await bcrypt.hash('hkbu123456', 10), role: 'admin', ChiName: '管理員', EngName: 'Administrator', Email: 'kennycheng@comp.hkbu.edu.hk', Date: new Date() });
  }

  if (await Email.count() == 0) {
    await Email.createEach([
      { "title": "已成功報名", "emailtitle": "已成功報名 %eventname%", "emailcontent": "敬啟者﹕<P></P>閣下所報讀之%eventname%已被接納，敬請攜同收據於下列時間道體育館出席訓練班有關資料如下：<p></p>上課日期：%eventclassdate%<P></P>上課時間：%eventclasstime%<P></P>上課地點：%eventvenue%<P></P>如有任何疑問，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 1 },
      { "title": "暫列入候補名單", "emailtitle": "暫列入候補名單 %eventname%", "emailcontent": "敬啟者﹕<P></P>本會已收到  閣下申請%eventname%的報名表，但該課程反應熱烈，申請暫列入侯補名單。<p></p>候補名單的申請有以下選擇﹕<br>1.   閣下可選擇繼續於候補名單，如有其他申請人退出，便有機會補上。<br>2.   閣下可通知本會轉讀其他課程，但需留意所轉讀之課程未必仍有空缺。 <P></P>如有任何疑問，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 2 },
      { "title": "已收到付款", "emailtitle": "已收到付款 %eventname%", "emailcontent": "敬啟者﹕<P></P>本會已收到  閣下的支票，本會現正處理有關申請，請閣下耐心等待本會發出之確認信，最遲將於開班前兩星期收到通知。<P></P>如閣下未能收到任何通知，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 3 },
      { "title": "由已成功報名名單改為候補名單", "emailtitle": "由已成功報名名單改為候補名單 %eventname%", "emailcontent": "敬啟者﹕<P></P>本會已收到  閣下申請%eventname%的報名表，但該課程反應熱烈，改為暫列入候補名單。<p></p>候補名單的申請有以下選擇﹕<br>1.   閣下可選擇繼續於候補名單，如有其他申請人退出，便有機會補上。<br>2.   閣下可通知本會轉讀其他課程，但需留意所轉讀之課程未必仍有空缺。 <P></P>如有任何疑問，可致電2504 8233與本會職員聯絡。<P></P>中國香港體操總會", "emailtype": 4 },
      { "title": "由候補名單改為已成功報名名單", "emailtitle": "由候補名單改為已成功報名名單 %eventname%", "emailcontent": "<p>敬啟者﹕</p><p>閣下報讀之%eventname%付款詳情如下:&nbsp;</p><p>課程費用:%eventprice%&nbsp;</p><p>如有任何疑問，可致電2504 8233與本會職員聯絡。</p><p>請最遲於開班前兩星期提交支票寄往香港郵政總局第1111 號信箱。支票抬頭請寫上「中國香港體操總會之付款」，否則將被取消資格。</p><p>中國香港體操總會</p>", "emailtype": 5 },
      { "title": "付款詳情", "emailtitle": "%eventname%之付款詳情", "emailcontent": "<p>敬啟者﹕&nbsp;</p><p>閣下報讀之%eventname%付款詳情如下:&nbsp;&nbsp;</p><p>課程費用:%eventprice%&nbsp;&nbsp;</p><p>如有任何疑問，可致電2504 8233與本會職員聯絡。</p><p>請最遲於開班前兩星期提交支票寄往香港郵政總局第1111 號信箱。支票抬頭請寫上「中國香港體操總會之付款」，否則將被取消資格。</p><p>中國香港體操總會</p>", "emailtype": 6 }, ,
    ]);

  }

  if (await News.count() == 0) {
    await News.createEach([
      { "category": "特別通告以及本會運動員及海外比賽消息", "startDate": new Date('2019-10-16'), "endDate": new Date("2020-10-16"), "content": "本會熱烈恭賀香港技巧體操隊員林曉勵、栗島晴楓在2019年10月7日至10月13日於烏茲別克舉辦之技巧體操亞洲錦標賽2019女子雙人決賽中以19.570分，取得第3名!", "link": "http://www.gahk.org.hk/doc/ACROasianchamp2019news.pdf" },
      { "category": "特別通告以及本會運動員及海外比賽消息", "startDate": new Date('2019-10-16'), "endDate": new Date("2020-10-16"), "content": "本會熱烈恭賀香港體操隊員石偉雄在2019年10月4日至10月13日於德國史特加舉辦之第49屆競技體操世界錦標賽男子跳馬決賽中以14.466分，取得第7名，這成績使其成功贏取東京奧運參賽資格！", "link": "http://www.gahk.org.hk/doc/Website_49thWorld%20Championships.pdf" },
      { "category": "特別通告以及本會運動員及海外比賽消息", "startDate": new Date('2019-09-24'), "endDate": new Date("2020-09-24"), "content": "恭喜香港健美體操隊在2019年9月10 日至15日於上海舉辦之2019年全國健美操聯賽第四站取得優異成績。 運動員葉慧雯、吳倩儀、吳浩嵐、胡栢賢及李泳怡於成人組精英組五人操進入決賽；葉慧雯、吳倩儀及吳浩嵐更以第七名的成績晉級決賽，成續優異。", "link": "http://www.gahk.org.hk/doc/website_AERShanghai.pdf" },
    ]);
  }

  //Testing for online application
  if (await GRGS.count() == 0) {
    await GRGS.createEach([
      { teamName: "香港浸會大學第一隊", phone: "12345678", email: "hkbuteam1@gmail.com", category: "集體 A 組(五人圈操)", chiName1: "陳一文", engName1: "Chan Yin Man", ID1: "A1111111", birth1: "2000-1-12", chiName2: "陳二文", engName2: "Chan Yi Man", ID2: "L2222222", birth2: "2000-2-12", chiName3: "陳三文", engName3: "Chan San Man", ID3: "N3333333", birth3: "2000-3-12", chiName4: "陳四文", engName4: "Chan Sai Man", ID4: "Y4444444", birth4: "2000-4-12", chiName5: "陳五文", engName5: "Chan Mon Man", ID5: "A5555555", birth5: "2000-5-12", chiName6: "陳六文", engName6: "Chan Loi Man", ID6: "B6666666", birth6: "2000-6-12", coachName: "陳大文", coachPhone: 22222222, leaderName: "浸大文", leaderPosition: "浸會大學體育教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon" },
      { teamName: "香港大學第一隊", phone: "23456789", email: "hkuteam1@gmail.com", category: "集體 B 組(五人圈操)", chiName1: "陳大一", engName1: "Chan Da Yin", ID1: "Y1111112", birth1: "1998-6-14", chiName2: "陳大二", engName2: "Chan Da Yi", ID2: "W2222232", birth2: "2000-3-2", chiName3: "陳大三", engName3: "Chan Da San", ID3: "V3243331", birth3: "1999-5-15", chiName4: "陳大四", engName4: "Chan Da Sai", ID4: "Y4456444", birth4: "2000-9-10", chiName5: "陳大五", engName5: "Chan Da Mon", ID5: "Y5554355", birth5: "2000-1-30", chiName6: "陳大六", engName6: "Chan Da Loi", ID6: "W1266666", birth6: "2000-2-3", coachName: "陳大大", coachPhone: 28022219, leaderName: "李小小", leaderPosition: "香港體育中心教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon" },
      { teamName: "香港大學第二隊", phone: "34567890", email: "hkuteam2@gmail.com", category: "集體 B 組(五人圈操)", chiName1: "陳一一", engName1: "Chan Yin Yin", ID1: "A1115611", birth1: "1997-1-5", chiName2: "李月月", engName2: "Lee Yu Yu", ID2: "B1322210", birth2: "2002-2-2", chiName3: "陳金金", engName3: "Chan Kam Kam", ID3: "C4333243", birth3: "2003-9-9", chiName4: "林女女", engName4: "Lam Lui Lui", ID4: "H4467444", birth4: "2004-4-4", chiName5: "吳火火", engName5: "Ng Fo Fo", ID5: "Y2345555", birth5: "2006-9-1", chiName6: "陳手手", engName6: "Chan Sau Sau", ID6: "Y2366662", birth6: "2008-6-31", coachName: "金日一", coachPhone: 22255561, leaderName: "黃老老", leaderPosition: "香港大學體育教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon" },
      // etc.
    ]);
  }

  if (await GRGP.count() == 0) {
    await GRGP.createEach([
      { teamName: "第一隊", phone: "12345688", email: "team1@gmail.com", category: "集體 C 組(三球兩帶)", chiName1: "陳一文", engName1: "Chan Yin Man", ID1: "A1111111", birth1: "2000-1-12", chiName2: "蔡水", engName2: "Choi Shau", ID2: "P5672222", birth2: "2008-9-13", chiName3: "陳文", engName3: "Chan Man", ID3: "O8833333", birth3: "2005-8-12", chiName4: "陳四", engName4: "Chan Sai", ID4: "Y6666044", birth4: "2003-6-16", chiName5: "周文", engName5: "Chow Man", ID5: "D1234555", birth5: "1996-1-11", chiName6: "郭文", engName6: "Kwok Man", ID6: "E6789666", birth6: "2001-6-11", coachName: "呂炎", coachPhone: 12322222, leaderName: "蔡一一", leaderPosition: "外國體育教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon" },
      { teamName: "第一隊", phone: "23456799", email: "team2@gmail.com", category: "集體 A 組(五人圈操)", chiName1: "林森", engName1: "Lam Sam", ID1: "B1111132", birth1: "1996-6-18", chiName2: "陳大心", engName2: "Chan Da Sam", ID2: "W2211232", birth2: "2002-3-2", chiName3: "周一", engName3: "Chou Yin", ID3: "G6743331", birth3: "1999-4-27", chiName4: "陳大", engName4: "Chan Da", ID4: "Y5456444", birth4: "2002-3-15", chiName5: "李五五", engName5: "Lee Mon Mon", ID5: "A2345655", birth5: "2002-1-31", chiName6: "陳六六", engName6: "Chan Loi Loi", ID6: "T1257666", birth6: "2003-2-2", coachName: "黃大", coachPhone: 28022555, leaderName: "黃井", leaderPosition: "香港體育中心教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon" },
      { teamName: "第二隊", phone: "34566890", email: "team3@gmail.com", category: "集體 A 組(五人圈操)", chiName1: "李李樹", engName1: "Lee Lee Shu", ID1: "A1100001", birth1: "1999-1-25", chiName2: "李月月", engName2: "Lee Yu Yu", ID2: "B1322210", birth2: "2002-2-2", chiName3: "金中", engName3: "Kam Chao", ID3: "Y4333143", birth3: "2003-9-28", chiName4: "林女月", engName4: "Lam Lui Yuen", ID4: "H1267441", birth4: "2004-4-14", chiName5: "吳水", engName5: "Ng Shau", ID5: "Y2367455", birth5: "2006-9-1", chiName6: "呂手", engName6: "Lui Sau", ID6: "Q2356662", birth6: "1998-6-31", coachName: "田一", coachPhone: 22255312, leaderName: "郭水", leaderPosition: "香港體育中心教練", NoOfTeam: 1, teamFee: 150, NoOfPeople: 6, insurance: 180, total: 330, payStatus: "unpaid", formStatus: "ToBeCon" },
      // etc.
    ]);
  }

  if (await TRGCompetition.count() == 0) {
    await TRGCompetition.createEach([
      {teamName: "機構一", Phone: "23456789", Email: "orgOne@gmail.com", CoachName: "張一一", CoachPhone: "91234567", category: "預備A,B組", Mate1ChiName: "王小明", Mate1EngName:"Wong Shui Ming", Mate1IDNo:"A123456(7)", Mate1Date:"2001-1-21", Mate2ChiName: "易千千", Mate2EngName: "Yik Ching Ching", Mate2IDNo: "B123456(7)", Mate2Date: "2000-11-28", Mate3ChiName: "陳大明", Mate3EngName: "Chan Tai Ming", Mate3IDNo: "C123456(7)", Mate3Date: "2001-4-5", Mate4ChiName: "王明明", Mate4EngName: "Wong Ming Ming", Mate4IDNo: "D123456(7)", Mate4Date: "2000-6-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "張進", leaderPosition: "機構一體操顧問", payStatus: "unpaid", formStatus: "ToBeCon"},
      {teamName: "機構二", Phone: "21855555", Email: "orgTwo@gmail.com", CoachName: "李二", CoachPhone: "61234567", category: "預備A,B組", Mate1ChiName: "陳嘉", Mate1EngName:"Cheng Ka", Mate1IDNo:"A234567(8)", Mate1Date:"2003-4-26", Mate2ChiName: "楊凡凡", Mate2EngName: "Yeung Fan Fan", Mate2IDNo: "B234567(8)", Mate2Date: "2001-10-29", Mate3ChiName: "李喜", Mate3EngName: "Lee Hei", Mate3IDNo: "C234567(8)", Mate3Date: "2000-12-5", Mate4ChiName: "方章", Mate4EngName: "Fong Cheung", Mate4IDNo: "D234567(8)", Mate4Date: "2002-7-12", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "陳明明", leaderPosition: "機構一體操部門主任", payStatus: "paid", formStatus: "accepted"},
      {teamName: "機構三", Phone: "24443333", Email: "orgThree@gmail.com", CoachName: "陳三", CoachPhone: "90909090", category: "高級A組", Mate1ChiName: "林好", Mate1EngName:"Lam Ho", Mate1IDNo:"A345678(9)", Mate1Date:"2000-1-7", Mate2ChiName: "周年", Mate2EngName: "Chou Lin", Mate2IDNo: "B345678(9)", Mate2Date: "1999-9-28", Mate3ChiName: "李白白", Mate3EngName: "Lee Ba Ba", Mate3IDNo: "C345678(9)", Mate3Date: "1998-11-11", Mate4ChiName: "楊桃", Mate4EngName: "Yeung To", Mate4IDNo: "D345678(9)", Mate4Date: "1999-6-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "周月眉", leaderPosition: "行政體操顧問", payStatus: "unpaid", formStatus: "ToBeCon"},
    ]);
  }

  if (await TSRGCompetition.count() == 0) {
    await TSRGCompetition.createEach([
      {teamName: "學校一", Phone: "27777777", Email: "schoolOne@gmail.com", CoachName: "周一", CoachPhone: "98765432", category: "初級A組", Mate1ChiName: "王小明", Mate1EngName:"Wong Shui Ming", Mate1IDNo:"A123456(7)", Mate1Date:"2001-1-21", Mate2ChiName: "易千千", Mate2EngName: "Yik Ching Ching", Mate2IDNo: "B123456(7)", Mate2Date: "2000-11-28", Mate3ChiName: "陳大明", Mate3EngName: "Chan Tai Ming", Mate3IDNo: "C123456(7)", Mate3Date: "2001-4-5", Mate4ChiName: "王明明", Mate4EngName: "Wong Ming Ming", Mate4IDNo: "D123456(7)", Mate4Date: "2000-6-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "張進", leaderPosition: "註校體操顧問", payStatus: "unpaid", formStatus: "ToBeCon"},
      {teamName: "學校二", Phone: "29056565", Email: "schoolTwo@gmail.com", CoachName: "超二二", CoachPhone: "64321123", category: "初級A組", Mate1ChiName: "陳嘉", Mate1EngName:"Cheng Ka", Mate1IDNo:"A234567(8)", Mate1Date:"2003-4-26", Mate2ChiName: "楊凡凡", Mate2EngName: "Yeung Fan Fan", Mate2IDNo: "B234567(8)", Mate2Date: "2001-10-29", Mate3ChiName: "李喜", Mate3EngName: "Lee Hei", Mate3IDNo: "C234567(8)", Mate3Date: "2000-12-5", Mate4ChiName: "方章", Mate4EngName: "Fong Cheung", Mate4IDNo: "D234567(8)", Mate4Date: "2002-7-12", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "陳明明", leaderPosition: "體操教練", payStatus: "unpaid", formStatus: "ToBeCon"},
      {teamName: "學校三", Phone: "23344344", Email: "schoolThree@gmail.com", CoachName: "李三", CoachPhone: "97717711", category: "初級A組", Mate1ChiName: "林好", Mate1EngName:"Lam Ho", Mate1IDNo:"A345678(9)", Mate1Date:"2000-1-7", Mate2ChiName: "周年", Mate2EngName: "Chou Lin", Mate2IDNo: "B345678(9)", Mate2Date: "1999-9-28", Mate3ChiName: "李白白", Mate3EngName: "Lee Ba Ba", Mate3IDNo: "C345678(9)", Mate3Date: "1998-11-11", Mate4ChiName: "楊桃", Mate4EngName: "Yeung To", Mate4IDNo: "D345678(9)", Mate4Date: "1999-6-18", TeamNumber: 1, TeamPrice: 150, TeamTotalPrice: 150, leaderName: "周月眉", leaderPosition: "學校活動主任", payStatus: "unpaid", formStatus: "ToBeCon"},
    ]);
  }

  if (await ClubMember.count() == 0) {
    await ClubMember.createEach([
      {OrgEngName: "Hong Kong Baptist University Gymnastics Club", OrgChiName: "香港浸會大學體操會", AppEngName: "Chou Tai Tai", AppChiName: "周大大", clubAddr:"香港九龍九龍塘香港浸會大學", clubTel: "34110000", clubFax: "34117777", clubEmail: "hkbuGymClub@hkbu.edu.hk", clubWeb: "https://www.hkbu.edu.hk/tch/about/contact.jsp", MemberNo: 150, brefDes: "We are Hong Kong Baptist University Gymnastics Club.", resEngName: "Chan Kai Ki", resChiName: "陳佳淇", position: "學校活動主任", resAddr: "Flat 6E, 6/F, Chan Chan House, Hong Kong", resTel: "97788777", resFax: "21113111", resEmail: "chankaiki@gmail.com", year: 2, clubFee: "150", payStatus: "unpaid", formStatus: "ToBeCon"},
      {OrgEngName: "Mrs.LeeChan Gymnastics Company", OrgChiName: "李陳女士體操公司", AppEngName: "Lee Ming Wai", AppChiName: "李明惠", clubAddr:"香港中環李陳女士大廈21樓", clubTel: "24988899", clubFax: "24988877", clubEmail: "leechanGym@gmail.com", clubWeb: "https://www.leechanGym.org", MemberNo: 300, brefDes: "We are Mrs.LeeChan Gymnastics Company.", resEngName: "Yeung Ming Ka", resChiName: "楊明家", position: "李陳女士體操公司秘書長", resAddr: "Flat 22B, 2/F, Lee Chan House, Wai Chai, Hong Kong", resTel: "96667789", resFax: "96667744", resEmail: "yeungmingka@gmail.com", year: 5, clubFee: "100", payStatus: "unpaid", formStatus: "ToBeCon"},
    ]);
  }

  





  return done();
};
