function startDiagnosis() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("diagnosis-content").style.display = "block";
  }
  
$(function(){
    let count = 0;
    let point = 0;
    const list = [
        {
            'title':'自分の達成したことをどう評価しますか？',
            'answer':[
                '自信がある',
                '普通',
                '自信がない'
            ]
        },
        {
            'title':'批判的な意見にどう対処しますか？',
            'answer':[
                '参考にして改善する',
                '無視して自分のやり方で続ける',
                '受け入れがたいと感じるため、気にしないようにする'
            ]  
        },
        {
            'title':'失敗やミスにどう対処しますか？',
            'answer':[
                '反省し、改善点を見つける',
                '次は成功するように頑張る',
                '落ち込んでしまい、なかなか立ち直れない'
            ]
        },
        {
            'title':'自分に対して厳しいですか？',
            'answer':[
                'はい。高い目標を設定しています',
                'まあまあ。できる範囲で頑張っています',
                'いいえ。自分に甘く接しています'
            ]
        }

    ];
    function render(count){
      $('li').remove();
      $('h1').text(list[count]['title']);
      list[0]['answer'].forEach(function(text){
        // ${変数}を文字列として出力したい場合は\バックスラッシュをつける
        const li = `<li>${text}</li>`;
        $('ul').append(li);
      });
    }
    render(0);
    function point_get(li_index){
        switch (li_index){
            case 0:
                return 1;
                break;
            case 1:
                return 0;
                break;
            case 2:
                return -1;
                break;
        }
    }
    if(localStorage.getItem('shindan') == null){
        $('#kekka').text('まだありません');
    } else {
        $('#kekka').text(localStorage.getItem('shindan'));
    }

    function point_text (point) {
        let text = '適度な自己肯定感';
        if(point > 3){
            text = '自己肯定感が高い'
        }
        if(point < -3){
            text = '自己肯定感が低い'
        }
        return text;
    }


    // liを押すとカウントが足されていく設定
    //後から作られる要素は親要素の中のliをクリックする設定が必要
    $('body').on('click', 'li',function(){
        const li_index = $('li').index(this);
        point += point_get(li_index);
        if(count < list.length-1){
            count++;
            render(count);
            $()
            } else {
                $('[data-point-num]').text(point_text(point));
                localStorage.setItem('shindan',point_text(point))
                $('ul,h1').hide();
                $('.point').fadeIn();
                console.log('end');
            }
    });

});