import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableHighlight, View, Image, TouchableOpacity, TouchableNativeFeedback, Keyboard } from 'react-native';
// Dimensions可以獲得螢幕尺寸大小
import { Dimensions } from 'react-native';
// 毛玻璃效果
import { BlurView } from 'expo-blur';


export default function App() {

  const [passWord, setPassWord] = useState('')
  const [userId, setUserId] = useState('')
  const [userIdState, setUserIdState] = useState('')  // 身份證格式判斷
  const [seePwd, setSeePwd] = useState(true)    // 是否顯示密碼
  const [count, setCount] = useState(0)   // 紀錄錯誤次數

  // 身分證格式判斷
  const isValidUserId = (str) => {
    const pattern = /^[A-Z][0-9]{9}$/;
    setUserIdState(str)
    if (pattern.test(str)) {
      return true
    } else {
      return false
    }
  }

  // 選取到密碼輸入時判斷身份證的格式是否正確
  const pwdIng = () => {
    const checkUserId = isValidUserId(userId)
    if (checkUserId) {
      setUserIdState('')
    } else {
      setUserIdState("身份證格式錯誤")
    }
  }


  // 密碼格式判斷 網路上copy的~~
  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      // return 'Password must not contain Whitespaces.';
      return '密碼中不包含空格'
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      // return 'Password must have at least one Uppercase Character.';
      return '至少要有一個大寫英文字母'
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      // return 'Password must have at least one Lowercase Character.';
      return '至少要有一個小寫字母'
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      // return 'Password must contain at least one Digit.';
      return '至少要有一個數字'
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      // return 'Password must be 8-16 Characters Long.';
      return '密碼長度為8-16個字'
    }
    return '帳號或密碼錯誤'
  }

  // 登入判斷
  const loginCheck = () => {
    const checkPassword = checkPasswordValidity(passWord)
    if (passWord === 'Xa123Y456' && userId === 'A123456789') {
      alert('成功登入')
      setCount(0)
    } else if (userId === '') {
      alert('請輸入帳號')
    } else if (passWord === '') {
      alert('請輸入密碼')
      setCount(count + 1)
    } else {
      alert(checkPassword)
      setCount(count + 1)
    }
  }

  // 填入帳號密碼
  const getPwd = () => {
    setPassWord('Xa123Y456')
    setUserId('A123456789')
  }

  // 生物認證
  const bioLogin = () => { alert('功能尚未開放') }



  return (
    // 點擊空白處關閉鍵盤
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.back_container}>
        {/* 背景圖片 */}
        <Image style={[styles.back_img, StyleSheet.absoluteFill]} source={require('./src/img/visax-bI_QFUZc5S4-unsplash.jpg')} />
        {/* 毛玻璃區塊 */}
        <BlurView intensity={15} tint={'light'}>
          <View style={styles.login_bg}>
            {/* ======== 介紹區塊 ======== */}
            <Image
              source={require('./src/img/bank2.png')}
              style={{ width: 90, height: 90, marginBottom: 20 }}
            />
            <Text style={styles.info_text}>歡迎使用阿強銀行{'\n'}登入會員後繼續使用服務</Text>
            {/* ======== 介紹區塊 ======== */}

            {/* ======== 帳號密碼輸入區 ======== */}
            {/* 帳號 */}
            <TextInput
              style={styles.input}
              placeholder='身份證字號'
              value={userId}
              onChangeText={(text) => setUserId(text)}
            ></TextInput>
            <Text style={styles.userIdState}>{userIdState}</Text>
            {/* 密碼 */}
            <View>
              <TextInput
                style={[styles.input, { marginBottom: 6 }]}
                placeholder='密碼'
                onFocus={() => { pwdIng() }}
                secureTextEntry={seePwd}
                value={passWord}
                onChangeText={(text) => setPassWord(text)}
                clearTextOnFocus={true}
              >
              </TextInput>
              <TouchableOpacity style={styles.pwd_icon} onPress={() => { setSeePwd(!seePwd) }}>
                <Image source={seePwd ?
                  require('./src/img/view.png') :
                  require('./src/img/hide.png')}
                  style={{ width: 24, height: 24 }} />
              </TouchableOpacity>
            </View>

            {count > 3 ?
              <Text style={styles.forget_pwd} onPress={() => { getPwd() }}>忘記密碼?</Text> :
              <Text style={styles.forget_pwd}></Text>}
            {/* ======== 帳號密碼輸入區 ======== */}

            {/* ======== 登入區塊 ======== */}
            <TouchableHighlight style={styles.btn} onPress={() => { loginCheck() }}>
              <Text style={{ color: '#4AAA72', fontSize: 20, fontWeight: 'bold', letterSpacing: 2 }}>LOGIN</Text>
            </TouchableHighlight>
            <TouchableOpacity onPress={() => { bioLogin() }}>
              <Image
                source={require('./src/img/finger-print2.png')}
                style={{ width: 50, height: 50, marginTop: 30 }}
              />
            </TouchableOpacity>
            <Text style={{ color: '#f4f4f4', fontSize: 12, marginTop: 10 }}>使用生物認證解鎖</Text>
            {/* ======== 登入區塊 ======== */}

          </View>
        </BlurView>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  back_container: {
    flex: 1,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back_img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  login_bg: {
    width: Dimensions.get('window').width / 100 * 90,     // 使用 Dimensions 取得螢幕寬，再進行百分比的縮放
    height: Dimensions.get('window').height / 100 * 85,    // 使用 Dimensions 取得螢幕高，再進行百分比的縮放
    // borderColor: '#f4f4f4',
    // borderWidth: 2,
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
    paddingTop: 50
  },
  info_text: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: "center",
    color: "#4AAA72",
    marginBottom: 40
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#1D1D1D',
    border: 'none',
    borderRadius: 16
  },
  input: {
    width: 280,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#E4E4E5",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 1,
    shadowOpacity: 1,
    // marginBottom: 20,
    paddingLeft: 14
  },
  forget_pwd: {
    fontSize: 12,
    color: "#4CB9DC"
  },
  pwd_icon: {
    position: 'absolute',
    right: 0,
    paddingTop: 14,
    paddingRight: 14
  },
  userIdState_text: {
    color: '#DB0E3F',
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    paddingLeft: 40,
    marginBottom: 8,
    marginTop: 2
  }
});
