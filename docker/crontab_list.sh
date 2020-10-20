0 */1 * * * git -C /scripts/ pull >> /scripts/logs/pull.log 2>&1
1 */1 * * * crontab /scripts/docker/${CRONTAB_LIST_FILE}
2 0 * * * node /scripts/jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
2 0 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
2 0 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
20 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
*/20 */1 * * * node /scripts/jd_joy_feedPets.js >> /scripts/logs/jd_joy_feedPets.log 2>&1
0 0,4,8,16 * * * node /scripts/jd_joy_reward.js >> /scripts/logs/jd_joy_reward.log 2>&1
0 1,6 * * * node /scripts/jd_joy_steal.js >> /scripts/logs/jd_joy_steal.log 2>&1
0 0,1,4,10,15,16 * * * node /scripts/jd_joy.js >> /scripts/logs/jd_joy.log 2>&1
40 */3 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
35 23,4,10 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
0 23,0-13/1 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
2 0 * * * node /scripts/jd_redPacket.js >> /scripts/logs/jd_redPacket.log 2>&1
3 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
15 * * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
55 23 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1