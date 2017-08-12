var setCountDown = {
    timer:null,
    init:function(opt){
        var _this = this;
        this.setShowTime(opt.endtime,opt.done);
        this.timer = setInterval(function(){
            _this.setShowTime(opt.endtime,opt.done,opt.callback)
        },1000)
    },
    getCountdown:function(time){
        var curShowTimeSecondsVal = this.getSecond(time) - this.getSecond();
        if(curShowTimeSecondsVal<0) return [0,'00','00','00'];
        // console.log(curShowTimeSecondsVal)
        // 剩余秒数
        var curShowTimeSeconds = parseInt(curShowTimeSecondsVal%60);
        // 计算剩余天数
        var curShowTimeDays = parseInt(curShowTimeSecondsVal/3600/24);
        // 计算剩余小时
        var curShowTimeHours = parseInt((curShowTimeSecondsVal/3600)) - curShowTimeDays*24;
        // 计算剩余分钟
        var curShowTimeMinutes = parseInt((curShowTimeSecondsVal - parseInt((curShowTimeSecondsVal/3600))*3600)/60);
        curShowTimeHours = curShowTimeHours > 9 ? curShowTimeHours : '0' + curShowTimeHours;
        curShowTimeSeconds = curShowTimeSeconds > 9 ? curShowTimeSeconds : '0' + curShowTimeSeconds;
        curShowTimeMinutes = curShowTimeMinutes > 9 ? curShowTimeMinutes : '0' + curShowTimeMinutes;
        return [curShowTimeDays,curShowTimeHours,curShowTimeMinutes,curShowTimeSeconds];
    },
    getSecond:function(times){
        if(times){
            var year = parseInt(times.slice(0,4)),
                month = parseInt(times.match(/-\d*/gi)[0].replace('-','')-1),
                day = parseInt(times.match(/-\d*/gi)[1].replace('-','')),
                hour = parseInt(times.match(/\d*:/)[0].replace(':','')),
                minute = parseInt(times.match(/:\d*/)[0].replace(':',''));
            return (new Date(year,month,day,hour,minute,0)).getTime()/1000;
        }
        return (new Date()).getTime()/1000;
    },
    setShowTime:function(endtime,done,callback){
        var _this = this;
        // var oSetTime = document.getElementById('time');
        var day = this.getCountdown(endtime)[0],
            hour = this.getCountdown(endtime)[1],
            minute = this.getCountdown(endtime)[2],
            second = this.getCountdown(endtime)[3];
        done([day,hour,minute,second])
        // oSetTime.innerHTML = '剩余时间：'+day+'天'+hour+'小时'+minute+'分'+second+'秒';
        if(day==0&&hour=='00'&&minute=='00'&&second=='00'){
            clearInterval(_this.timer);
            _this.timer = null;
            if(callback) callback();
        }
    }
};
setCountDown.init({
    endtime:'2017-8-13 02:40',
    done:function(data){
        document.getElementById('timesp').innerHTML = data[0]+'天'+data[1]+'小时'+data[2]+'分'+data[3]+'秒';
        document.getElementById('etimesp').innerHTML = data[0]+'day-'+data[1]+'h-'+data[2]+'m-'+data[3]+'s';
    },
    callback:function(){

    }
})