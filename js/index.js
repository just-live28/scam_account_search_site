function is_scam_account(bankType, account) {
    // 국민(14자리)
    const kb_14 = ["03", "23", "26"];
    // 신한(12자리)
    const shinhan_12 = ["230", "223"];
    // 우리(13자리)
    const woori_13 = ["040"];
    // 하나(14자리)
    const hana_14 = ["21", "25"];
    // 농협(11~13자리)
    const nh_11 = ["04", "34", "47", "49", "59"];
    const nh_12 = ["04", "34", "47", "49", "59"];
    const nh_13 = ["304", "334", "347", "349", "359", "004", "034", "047", "049", "059"];
    // 수협(12자리)
    const suhyup_12 = ["1400", "1410"];
    // 기업(14자리)
    const ibk_14 = ["14"];
    // 산업(14자리)
    const kdb_14 = ["031", "032", "037"];
    // 카카오(13자리)
    const kakao_13 = ["355"];
    // 케이뱅크(12자리)
    const kbank_12 = ["1102"];
    // 토스(12자리)
    const toss_12 = ["300"];
    // 경남(13자리)
    const kyongnam_13 = ["225", "229", "231", "241"];
    // 광주(12~13자리)
    const kwangju_12 = ["133"];
    const kwangju_13 = ["133"];
    // 대구(12자리)
    const daegu_12 = ["521", "527"];
    // 부산(13자리)
    const busan_13 = ["104"];
    // 전북(13자리)
    const jeonbuk_13 = ["1031"];
    // 제주(10, 12자리)
    const jeju_10 = ["07", "20"];
    const jeju_12 = ["730", "740"];
    // 씨티(11자리, 13자리)
    const city_11 = ["16", "18", "19", "20", "37", "38", "39"]
    const city_13 = ["16", "18", "19", "20", "37", "38", "39"]
    // SC(11자리)
    const sc_11 = ["90"];

    if (bankType === "국민" && account.length === 14) {
        return kb_14.includes(account.substring(4, 6));
    } else if (bankType === "신한" && account.length === 12) {
        return shinhan_12.includes(account.substring(0, 3));
    } else if (bankType === "우리" && account.length === 13) {
        return woori_13.includes(account.substring(1, 4));
    } else if (bankType === "하나" && account.length === 14) {
        return hana_14.includes(account.substring(12, 14));
    } else if (bankType === "농협" && account.length >= 11 && account.length <= 13) {
        if (account.length === 11) {
            return nh_11.includes(account.substring(3, 5));
        } else if (account.length === 12) {
            return nh_12.includes(account.substring(4, 6));
        } else if (account.length === 13) {
            return nh_13.includes(account.substring(0, 3));
        }
    } else if (bankType === "수협" && account.length === 12) {
        return suhyup_12.includes(account.substring(0, 4));
    } else if (bankType === "기업" && account.length === 14) {
        return ibk_14.includes(account.substring(9, 11));
    } else if (bankType === "산업" && account.length === 14) {
        return kdb_14.includes(account.substring(0, 3));
    } else if (bankType === "카카오" && account.length === 13) {
        return kakao_13.includes(account.substring(1, 4));
    } else if (bankType === "케이뱅크" && account.length === 12) {
        return kbank_12.includes(account.substring(0, 4));
    } else if (bankType === "토스" && account.length === 12) {
        return toss_12.includes(account.substring(0, 3));
    } else if (bankType === "경남" && account.length === 13) {
        return kyongnam_13.includes(account.substring(0, 3));
    } else if (bankType === "광주" && account.length >= 12 && account.length <= 13) {
        if (account.length === 12) {
            return kwangju_12.includes(account.substring(3, 6));
        } else if (account.length === 13) {
            return kwangju_13.includes(account.substring(1, 4));
        }
    } else if (bankType === "대구" && account.length === 12) {
        return daegu_12.includes(account.substring(0, 3));
    } else if (bankType === "부산" && account.length === 13) {
        return busan_13.includes(account.substring(0, 3));
    } else if (bankType === "전북" && account.length === 13) {
        return jeonbuk_13.includes(account.substring(0, 4));
    } else if (bankType === "제주" && (account.length === 10 || account.length === 12)) {
        if (account.length === 10) {
            return jeju_10.includes(account.substring(1, 3));
        } else if (account.length === 12) {
            return jeju_12.includes(account.substring(0, 3));
        }
    } else if (bankType === "씨티" && (account.length === 11 || account.length === 13)) {
        if (account.length === 11) {
            return city_11.includes(account.substring(8, 10));
        } else if (account.length === 13) {
            return city_13.includes(account.substring(8, 10));
        }
    } else if (bankType === "SC" && account.length === 11) {
        return sc_11.includes(account.substring(3, 5));
    }

    return null
}

$("#searchButton").on("click", function () {
    let bankType = $("#bankType").val();
    let account = $("#bankAccount").val().replaceAll('-', '').replaceAll(' ', '');

    if (bankType === "0") {
        alert("은행 종류를 선택해주세요");
        return;
    } else if (account === "") {
        alert("조회할 계좌 번호를 입력해주세요");
        return;
    }

    let result = is_scam_account(bankType, account);
    if (result === null) {
        $(".resultDesc").text(`해당 은행 자유적금계좌 자릿수가 맞지 않습니다. 다시 확인해주세요`);
    } else if (result) {
        $(".resultDesc").css("color", "red");
        $(".resultDesc").html(`해당 계좌는 자유적금계좌입니다.<br>지금 즉시 거래를 중단하세요!`);
    } else {
        $(".resultDesc").css("color", "black");
        $(".resultDesc").text(`해당 계좌는 자유적금계좌가 아닙니다.`);
    }
    $(".inputBox").hide();
    $(".resultAccount").text(bankType + ' ' + account);
    $(".resultBox").show();

});

$("#returnButton").on("click", function () {
    $("#bankType").val("0");
    $("#bankAccount").val("");
    $(".inputBox").show();
    $(".resultBox").hide();
})

