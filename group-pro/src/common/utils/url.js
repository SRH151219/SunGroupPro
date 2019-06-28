export default{
  singer(mid){
    var mid=mid||'003JGrNQ3RjelA'
    return `https://y.gtimg.cn/music/photo_new/T001R300x300M000${mid}.jpg?max_age=2592000`
            
  },
  song(songmid){
    var songmid=songmid||'001TXSYu1Gwuwv'
    return `http://dl.stream.qqmusic.qq.com/C400${songmid}.m4a?guid=3920749757&vkey=D4BA2547B8E0191431E3248A152463F3A05732DB1D815BBA582B139E1F35D956318E16AE84FAA145DBCD8AEE7703C1D56B7338067B4AE824&uin=0&fromtag=38`
            // http://dl.stream.qqmusic.qq.com/C400001TXSYu1Gwuwv.m4a?guid=3920749757&vkey=D4BA2547B8E0191431E3248A152463F3A05732DB1D815BBA582B139E1F35D956318E16AE84FAA145DBCD8AEE7703C1D56B7338067B4AE824&uin=0&fromtag=38
  },
  album(mid){
    var mid =mid||'003y8dsH2wBHlo'
    return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg?max_age=2592000`
  },
  lyric(mid){
    var mid = mid||'001TXSYu1Gwuwv'
    return  `/hy/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=${mid}&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000&pcachetime=1561539093972`
  }
}