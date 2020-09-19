/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。注：github action用户ck填写到Settings-Secrets里面
let CookieJDs = [
  'pt_key=AAJfWWZQADDNkv-rtrzqtzB1vi03MWtQ2lr9ftD066oAeyDpeFROOEhaFRN65qKd2nKZr_8Rafg;pt_pin=jd_6cd93e613b0e5;',//账号一ck
  // 'pt_key=AAJfUizYAEC9DZlUpR_bmYOFNgwKXDMKoPX0rRDcXSWOaGemcfHTFDsJ3BkYOPcCTIprRm-OQfdoGQ2BEwxh7_qOnTEMUKHQ;pt_pin=%E8%A2%AB%E6%8A%98%E5%8F%A0%E7%9A%84%E8%AE%B0%E5%BF%8633;',//账号二ck,如有更多,依次类推
  // 'pt_key=AAJfYrdqADAnCxWzDpJF_f5NsBXhKXIgJzjlkxlNHsDbGEATdXPhPUQ9_jrem_TSDcRVKAET1hc;pt_pin=zooooo58;',//账号二ck,如有更多,依次类推
  // 'pt_key=AAJfPyXfADDBrCmpXn05CgKeO1b4DQpfpCgLyNv-1MM16HX0Otywuad7WxcnKBCAMdYujdr1JXs;pt_pin=jd_45a6b5953b15b;',//账号二ck,如有更多,依次类推
  // 'pt_key=AAJfWw3pADAc-E_dD0LiU8RmNnaFquzTze7knrTV1v6bvsDUOJ9nTRXSwmSqLdg2z6lNofCEsHE;pt_pin=jd_704a2e5e28a66;',//账号二ck,如有更多,依次类推
  // 'pt_key=AAJfR7GoADAYphNI7_i2CbzmZhfcZtP8sKXhzN9RBS_DYULdLoCSOA9bIAuHSO1tRzjcDj7SH5o;pt_pin=ecyduo;',//账号二ck,如有更多,依次类推
]
// 判断github action里面是否有京东ck
if (process.env.JD_COOKIE && process.env.JD_COOKIE.split('&') && process.env.JD_COOKIE.split('&').length > 0) {
  CookieJDs = process.env.JD_COOKIE.split('&');
  console.log(`\n==================脚本执行来自 github action=====================\n`)
  console.log(`==================脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}=====================\n`)
  console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}=====================\n`)
}
for (let i = 0; i < CookieJDs.length; i++) {
  const index = (i + 1 === 1) ? '' : (i + 1);
  exports['CookieJD' + index] = CookieJDs[i];
}
