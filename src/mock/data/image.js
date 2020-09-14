const Mock = require('mockjs')

const imageDataList = [
  'http://attach.bbs.miui.com/forum/201110/07/082734u82j4uu8tcczja4n.jpg',
  'http://attach.bbs.miui.com/forum/201107/28/230815vijrsi9zviw8ssy2.jpg',
  'http://attach.bbs.miui.com/forum/201605/17/121424xagg8zigk4zaqitk.jpg',
  'http://attach.bbs.miui.com/forum/201605/17/121525zefcf0xgk1yxefex.jpg',
  'http://a.hiphotos.baidu.com/zhidao/pic/item/bba1cd11728b471011bbd6a9c2cec3fdfc03233a.jpg',
  'http://attach.bbs.miui.com/forum/201605/17/121556vh2kmmame0zb811m.jpg',
  'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1703714980,1166609663&fm=26&gp=0.jpg',
  'http://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/83025aafa40f4bfbe7027fc1014f78f0f6361850.jpg',
  'http://attach.bbs.miui.com/forum/201605/17/121506o466bjb76zmz6kj6.jpg',
  'http://attach.bbs.miui.com/forum/201208/16/1624168eexe7iex3ottxez.jpg',
  'http://img10.360buyimg.com/imgzone/jfs/t7642/6/2121369395/420335/8efb036f/59a8ca82N7f58fee6.jpg',
  'http://b.hiphotos.baidu.com/zhidao/pic/item/ac6eddc451da81cb70ef39005366d016082431f5.jpg',
  'http://pic1.win4000.com/wallpaper/4/57e348daa35eb.jpg',
  'http://attach.bbs.miui.com/forum/201306/10/192621gvktnkenhheenken.jpg',
  'http://attach.bbs.miui.com/forum/201501/25/203232ky37vt6y9f38yynl.jpg',
  'http://attach.bbs.miui.com/forum/201606/27/075757zssjnu9kl941uwl1.jpg',
  'http://attach.bbs.miui.com/forum/201408/07/214557cnofsozogllsbapb.jpg',
  'http://attach.bbs.miui.com/forum/201708/04/000855udvz9wdvz62qw0qb.jpg',
  'http://attach.bbs.miui.com/forum/201410/26/195435hwgixyql24lwhwqi.jpg',
  'http://attach.bbs.miui.com/forum/201501/14/204215bccd9999gvjdbz9b.jpg',
  'http://attach.bbs.miui.com/forum/201501/24/124652cghzygviyv3f0vsm.jpg',
  'http://attach.bbs.miui.com/forum/201202/06/002616frowmyworz64hnyo.jpg',
  'http://attach.bbs.miui.com/forum/201501/29/143316ytpjx2ptbbmsdb2m.jpg',
  'http://attach.bbs.miui.com/album/201210/14/1551551zhffbkky26bbhog.jpg'
]

const Random = Mock.Random;
Random.extend({
  imgUrl: function () {
    return imageDataList[Random.natural(0, imageDataList.length - 1)]
  }
})

const getRandomImgUrl = () => {
  return Random.imgUrl();
}

export default getRandomImgUrl
