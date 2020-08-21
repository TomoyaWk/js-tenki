window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temprature = document.querySelector('.temp');//温度
    let tempMax = document.querySelector('.temp-max');//最高温度
    let tempMin = document.querySelector('.temp-min');//最低温度
    let tempSection = document.querySelector('.row2');
    let tempType = document.querySelector('.temp-type');//温度表示タイプ

    let weatherDescription = document.querySelector('.weather-description'); //cloudy等気候名 
    let location = document.querySelector('.weather-location'); //取得できた座標地名
    let icon = document.querySelector('.weatherType');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            let api = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {

                    //APIから取得した値を代入する
                    temprature.textContent = Math.trunc(data.main.temp);
                    tempMax.textContent = Math.trunc(data.main.temp_max);
                    tempMin.textContent = Math.trunc(data.main.temp_min);
                    location.textContent = data.name;
                    weatherDescription.textContent = data.weather[0].description;
                    icon.id = data.weather[0].main;//アイコン位置のIDを気候名の文字列へ変更


                    //アイコン設置
                    let icons = new Skycons({"color":"white"});
                    //天気ＩＤに合わせアイコン設定する
                    icons.set("Clear", Skycons.CLEAR_DAY);
                    icons.set("Clear-night", Skycons.CLEAR_NIGHT);
                    icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
                    icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
                    icons.set("Clouds", Skycons.CLOUDY);
                    icons.set("Rain", Skycons.RAIN);
                    icons.set("Sleet", Skycons.SLEET);
                    icons.set("Snow", Skycons.SNOW);
                    icons.set("Wind", Skycons.WIND);
                    icons.set("Fog", Skycons.FOG);
                    icons.play();

                    //摂氏→華氏変換
                    tempSection.addEventListener('click', () =>{
                        if (tempType.textContent === "°F"){
                            temprature.textContent = Math.trunc(data.main.temp);
                            tempType.textContent = "°C";
                        } else {
                            temprature.textContent = Math.floor(((data.main.temp) * 1.8 ) + 32);
                            tempType.textContent = "°F";
                        }
                    });

                });
        }, function(error){
            // エラーコードのメッセージを定義
            let errorMessage = {
                0: "原因不明のエラーが発生しました…。" ,
                1: "位置情報の取得が許可されませんでした…。" ,
                2: "電波状況などで位置情報が取得できませんでした…。" ,
                3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。" ,
            };
            alart(errorMessage[error.code]);
        })
    }
})











// // jquery、DOM要素が始まった後に処理開始
// $(document).ready(function () {
//     //緯度経度
//     let lat;
//     let long;

//     if (navigator.geolocation) {
//         //現在地取得
//         navigator.geolocation.getCurrentPosition(function (position) {
            
//             lat = position.coords.latitude;//緯度
//             long = position.coords.longitude;//経度

//             let api = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long + '';

//             $.getJSON(api, function (res) {
//                 console.log(res);

//                 let celsius = res.main.temp;
//                 let farenheit = (celsius * 1.8) + 32;

//                 let location = res.name;
                
                

//                 //SETTING UP THE ICON 
//                 var icons = new Skycons({
//                     "color": "white"
//                 });

//                 icons.set("Clear", Skycons.CLEAR_DAY);
//                 icons.set("Clear-night", Skycons.CLEAR_NIGHT);
//                 icons.set("Partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
//                 icons.set("Partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
//                 icons.set("Clouds", Skycons.CLOUDY);
//                 icons.set("Rain", Skycons.RAIN);
//                 icons.set("Sleet", Skycons.SLEET);
//                 icons.set("Snow", Skycons.SNOW);
//                 icons.set("Wind", Skycons.WIND);
//                 icons.set("Fog", Skycons.FOG);
//                 icons.play();
//             });
//         }, );
//     }
// });