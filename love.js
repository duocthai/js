var finish = false;
var cautraloi = [];
var dapan = [];
var cauhoi = [];
var tongcauhoi = 28;
var gender = 0;

function IsNull(data) {
    if (typeof (data) == 'undefined' || data == null)
        return false;
    return true;
}
function removeJson(property, num, arr) {
    for (var i in arr) {
        if (arr[i][property] == num)
            arr.splice(i, 1);
    }
}
function findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
        if (arr[i][propName] == propValue)
            return arr[i];
    /* will return undefined if not found; you could return a default instead*/
}
function ResetAll() {
    tongcauhoi = 0;
    cautraloi = [];
    dapan = [];
    cauhoi = [];
}

function RemoveOldKey(key) {
    var old_key = findElement(cautraloi, 'cauhoi', key)
    if (old_key !== undefined) {
        removeJson('cauhoi', old_key.cauhoi, cautraloi);
    }
}

function loadtestlove(_gender) {
    ResetAll();
    var url_cauhoi = '', url_traloi = '';
    gender = _gender;
    if (gender == 'nam') {
        url_cauhoi = '/xml/namCauHoiLove.txt';
        url_traloi = '/xml/namTraLoiLove.txt';
        tongcauhoi = 28;
    }
    else {
        url_cauhoi = '/xml/nuCauHoiLove.txt';
        url_traloi = '/xml/nuTraLoiLove.txt';
        tongcauhoi = 28;
    }
    $.getJSON(url_traloi, null, function (a) {
        dapan = a;
        tongcauhoi = a.length;
    });
    $.getJSON(url_cauhoi, null, function (e) {
        var c = $("#baitest");
        var g = $("#khungdapan");
        var h = "<p class='txt3'>Cauhoi<span class='purple'>/" + tongcauhoi+"</span></p>";
        var b = "<div class='dapanchu'>";
        var k = "<p class='txt4 mb-30'>picture</p>";
        var a = "<div class='tra-loi'><input id='ageiddapan' type='radio' name='cauradio' onclick='luudapanchu(idcauhoi,iddapan,stt)'><label for='ageiddapan' class='normal-txt'>picture</label></div>";
        var d = "<li><a class='stt' href='javascript:;' onclick='loadcauhoi(stt)' data-val='stt'>stt</a></li>";
        c.html("");
        var i = 0;
        var f = "";
        var j = "";
        $.each(e, function (l, m) {
            if (i != m.STT) {
                if (i == 0) {
                    f = "<div class='test num" + m.STT + "' style='display: block;'>"
                } else {
                    f = "<div class='test num" + m.STT + "' style='display: none;'>"
                }
                f += h.replace("Cauhoi", m.STT);
                f += k.replace("picture", m.NameQues);
                f += b + a.replace("idcauhoi", m.IDQues).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("cauradio", "cauradio" + m.IDQues).replace("picture", m.NameAns).replace("stt", m.STT);
                j += d.replace("stt", m.STT).replace("stt", m.STT).replace("stt", m.STT).replace("stt", m.STT)
            } else {
                if (e.length == l + 1) {
                    f += a.replace("idcauhoi", m.IDQues).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("cauradio", "cauradio" + m.IDQues).replace("picture", m.NameAns).replace("stt", m.STT) + "</div>";
                    f += "<a href='javascript:;' class='cautruoc' onclick='loadcauhoi(" + (parseInt(m.STT) - 1) + ")'>Quay lại câu " + (parseInt(m.STT) - 1) + "</a>";
                    c.append(f);
                    j += "</ul>";
                    g.append(j);
                    f = "";
                    j = "";
                    tongcauhoi = m.STT;
                } else {
                    if (i != e[l + 1].STT) {
                        f += a.replace("idcauhoi", m.IDQues).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("cauradio", "cauradio" + m.IDQues).replace("picture", m.NameAns).replace("stt", m.STT) + "</div>";
                        if (m.STT != "1") {
                            f += "<a href='javascript:;' class='cautruoc' onclick='loadcauhoi(" + (parseInt(m.STT) - 1) + ")'>Quay lại câu " + (parseInt(m.STT) - 1) + "</a>"
                        }
                        c.append(f)
                    } else {
                        f += a.replace("idcauhoi", m.IDQues).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("iddapan", m.IDAns).replace("cauradio", "cauradio" + m.IDQues).replace("picture", m.NameAns).replace("stt", m.STT)
                    }
                }
            }
            i = m.STT
        })
    })
}

function loadcauhoi(a) {
    $("#khungdapan>ul>li>a").removeClass("active");
    var c = "." + a;
    $(c).addClass("active");
    $(".test").hide();
    var b = ".num" + a;
    $(b).show()
}

function luudapanchu(e, d, stt) {
    RemoveOldKey(e);
    cautraloi.push({ cauhoi: e, dapan: d });    
    var b = $("." + stt);
    b.addClass("done");
    if (tongcauhoi == stt) {
        /*nếu trả lời đủ câu hỏi thì hiển thị kết quả*/
        if (cautraloi.length == tongcauhoi) {
            xemketqua();
        }
        else goto_QuesNoAns();
    }
    else {
        window.setTimeout(function () {
            loadcauhoi(stt + 1)
        }, 100)
    }
}

function goto_QuesNoAns() {
    $.each($("#khungdapan>ul>li>a"), function (b, a) {
        if ($(a).hasClass("done") == false) {
            window.setTimeout(function () {
                loadcauhoi($(a).attr("data-val"))
            }, 100);
            return false
        }
    })
}

function checkfinish(b) {
    var c = "";
    var a = 0;
    $.each($("#khungdapan>ul>li>a"), function (e, d) {
        if ($(d).hasClass("done") == false) {
            c += $(d).text() + ", ";
            a++
        }
    });
    if (a == 0) {
        return 0
    } else {
        if (b) {
            alert("Bạn còn các câu: " + c + "chưa hoàn thành.")
        }
        return a
    }
}

function tinhdiem() {
    //var diem = 0;
    var cautraloi2 = [];
    $.each(dapan, function (i, item) {
        var _item = findElement(cautraloi, 'cauhoi', item.IDQues);
        if (_item !== undefined) {
            if (_item.dapan != item.IDAns) {
                //diem++;
                cautraloi2.push({ IDQues: item.IDQues, IDAns: _item.dapan, StatusAns: false });
            }
            else {
                cautraloi2.push({ IDQues: item.IDQues, IDAns: _item.dapan, StatusAns: true });
            }
        }
        //else {
        //    diem++;
        //}
    });
    return cautraloi2;
}

function xemketqua() {
    //var a = "<div class='col-12'> <img src='/img/hoan-thanh-trac-nghiem-tinh-yeu.svg'> <p class='txt3'>Chúc mừng bạn vừa hoàn thành xong bài test.</p> <div class='d-flex justify-center'> <a href='javascript:' class='btn btn-5 mt-30 pink-btn purple-btn m-15' onclick='quaylai()'>Coi lại bài test</a> <a href='javascript:' class='btn btn-5 mt-30 pink-btn m-15' onclick='dienthongtin()'>Xem kết quả</a> </div> </div>";
    //$("#updatetestiq").html(a);
    $("#updatetestiq2").show();
    $("#updatetestiq").hide()
}

function quaylai() {
    $("#updatetestiq2").hide();
    $("#updatetestiq").show()
};