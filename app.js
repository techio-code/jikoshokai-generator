// ============================================
// 自己紹介ジェネレーター - app.js
// テンプレート組み合わせ方式（API不要・無料）
// ============================================

// --- 状態管理 ---
let state = {
  name: '',
  job: '',
  experience: '',
  hobby: '',
  tone: '',
  strengths: [],
  scene: '',
  appeal: ''
};

// ============================================
// テンプレートデータ
// ============================================

// 経験年数テキスト
const EXP_TEXT = {
  'beginner': '始めたばかり',
  '1-2': '1〜2年ほど',
  '3-5': '3〜5年ほど',
  '5-10': '5〜10年ほど',
  '10+': '10年以上',
  'student': '学生として'
};

const EXP_PHRASE = {
  'beginner': ['まだまだ新米ですが', '始めたばかりで日々勉強中ですが', '駆け出しですが'],
  '1-2': ['少しずつ経験を積んできて', '1年ほど経験を重ねてきて', 'ようやく仕事の面白さが分かってきた'],
  '3-5': ['それなりに経験を積んできて', '中堅として', '一通りの業務を経験してきた中で'],
  '5-10': ['ある程度のキャリアを積み', '長年の経験を活かして', 'いろんな現場を見てきた中で'],
  '10+': ['長いキャリアの中で', 'ベテランとして', '数多くの経験を積んできた中で'],
  'student': ['まだ学生ですが', '学びの最中ですが', '将来を見据えて']
};

// シーン別の冒頭
const SCENE_OPENERS = {
  business: {
    formal: [
      'はじめまして。{name}と申します。',
      'お世話になります。{name}と申します。',
      '初めてお目にかかります。{name}です。'
    ],
    casual: [
      'はじめまして！{name}です。',
      'どうも、{name}です！',
      '{name}といいます！よろしくお願いします。'
    ],
    humor: [
      'はじめまして！覚えやすい名前の{name}です。',
      'どうも！よく「話しやすいね」と言われる{name}です。',
      '{name}と申します。名前だけでも覚えて帰ってください！'
    ],
    passionate: [
      'はじめまして！{name}です！お会いできて嬉しいです！',
      '{name}です！今日この場に来られたことに感謝してます！',
      'はじめまして、{name}です！ワクワクしてます！'
    ]
  },
  sns: {
    formal: [
      '{name}です。',
      '{name}と申します。',
      'はじめまして、{name}です。'
    ],
    casual: [
      '{name}です！',
      '{name}だよ！フォローありがとう！',
      'どうも、{name}です👋'
    ],
    humor: [
      '{name}です。プロフまで読んでくれるあなた、好きです。',
      '{name}です。フォローしたら人生ちょっとだけ楽しくなるかも。',
      'どうも{name}です。中の人は普通の人間です。'
    ],
    passionate: [
      '{name}です！毎日全力で発信中🔥',
      '{name}です！ここでは本音で語ります！',
      '全力で生きてる{name}です！'
    ]
  },
  interview: {
    formal: [
      '{name}と申します。本日は貴重なお時間をいただきありがとうございます。',
      'はじめまして、{name}と申します。本日はよろしくお願いいたします。',
      '{name}と申します。このような機会をいただき、大変嬉しく思います。'
    ],
    casual: [
      'はじめまして、{name}と申します。今日はよろしくお願いします！',
      '{name}です。本日はありがとうございます！',
      '{name}と申します。リラックスしてお話しできればと思います。'
    ],
    humor: [
      '{name}と申します。緊張していますが、それだけ本気です！',
      'はじめまして、{name}です。面接は緊張しますが、仕事への情熱は本物です！',
      '{name}です。今日は自分を売り込みに来ました！'
    ],
    passionate: [
      '{name}です！この会社で働きたいという気持ちは誰にも負けません！',
      'はじめまして、{name}です。今日は全力でお話しさせてください！',
      '{name}と申します。本日は精一杯、自分をお伝えします！'
    ]
  },
  party: {
    formal: [
      'はじめまして、{name}と申します。',
      '{name}です。今日はよろしくお願いします。',
      'どうも、{name}です。お会いできて嬉しいです。'
    ],
    casual: [
      'どうも〜！{name}です！',
      '{name}です！今日は楽しみましょう！',
      'はじめまして！{name}って呼んでください！'
    ],
    humor: [
      '{name}です！とりあえずビールで！…あ、自己紹介でしたね。',
      'どうも、飲み会大好きマンの{name}です。',
      '{name}です。お酒が入ると饒舌になるタイプです。'
    ],
    passionate: [
      '{name}です！今日は全力で楽しみます！',
      'どうも{name}です！最高の夜にしましょう！',
      '{name}です！みんなと話せるの楽しみにしてました！'
    ]
  },
  school: {
    formal: [
      'はじめまして、{name}です。よろしくお願いします。',
      '{name}といいます。これからよろしくお願いします。',
      '{name}です。みなさんと一緒に頑張りたいです。'
    ],
    casual: [
      '{name}です！よろしく！',
      'どうも、{name}です〜！仲良くしてね！',
      '{name}です！気軽に話しかけてくれたら嬉しい！'
    ],
    humor: [
      '{name}です。友達100人できるかな…いや、3人でいいです。',
      'どうも{name}です！すぐ名前忘れるので何回でも聞いてください。',
      '{name}です。第一印象は「普通」ってよく言われます。'
    ],
    passionate: [
      '{name}です！最高のクラスにしよう！',
      'どうも{name}です！全力で楽しむタイプです！',
      '{name}です！みんなと過ごす時間を大切にしたい！'
    ]
  },
  presentation: {
    formal: [
      'みなさま、こんにちは。{name}と申します。',
      '本日お話しさせていただきます{name}です。',
      'ご紹介にあずかりました{name}と申します。'
    ],
    casual: [
      'こんにちは！{name}です。',
      'みなさんどうも！{name}です。',
      '{name}です！今日はよろしくお願いします。'
    ],
    humor: [
      '{name}です。スライドより僕の方が面白いと信じてます。',
      'どうも{name}です。話が長くなったら遠慮なく咳払いしてください。',
      'こんにちは！いつも5分オーバーする{name}です。'
    ],
    passionate: [
      '{name}です！今日の話、絶対面白いです！聞いてください！',
      'みなさん、こんにちは！{name}です。今日は全力でお伝えします！',
      '{name}です！この話をずっとしたかったんです！'
    ]
  }
};

// 職種の紹介文
const JOB_INTRO = {
  formal: [
    '現在、{job}として{exp}活動しております。',
    '{job}として{exp}仕事に携わっています。',
    '仕事は{job}をしており、{exp}になります。'
  ],
  casual: [
    '普段は{job}をやってるよ！{exp}くらいかな。',
    '{job}を{exp}やってます！',
    '仕事は{job}！{exp}になるかな。'
  ],
  humor: [
    '{job}を{exp}やってます。好きか嫌いかでいうと…好きです！',
    '{job}歴{exp}。毎日がアドベンチャーです。',
    'お仕事は{job}。{exp}経ちましたが、まだまだ驚きの連続です。'
  ],
  passionate: [
    '{job}として{exp}全力で取り組んでいます！',
    '{job}の仕事が大好きで、{exp}夢中でやってます！',
    '{job}を{exp}。この仕事に情熱を注いでます！'
  ]
};

// 強みの紹介文
const STRENGTH_TEMPLATES = {
  formal: [
    '自分の強みは{strengths}だと考えています。',
    '{strengths}を活かした仕事を心がけています。',
    '周りからは{strengths}とよく言っていただきます。'
  ],
  casual: [
    '自分の強みは{strengths}かな！',
    '{strengths}には自信あり！',
    'よく{strengths}って言われるよ！'
  ],
  humor: [
    '自慢じゃないですが、{strengths}です。…自慢でした。',
    '強みは{strengths}。弱みは聞かないでください。',
    '{strengths}が取り柄です。あとは…お察しください。'
  ],
  passionate: [
    '{strengths}という強みを全力で磨いています！',
    '誰にも負けない{strengths}で勝負します！',
    '{strengths}を武器に、どんどん挑戦していきます！'
  ]
};

// 趣味
const HOBBY_TEMPLATES = {
  formal: [
    'プライベートでは{hobby}を楽しんでおります。',
    '趣味は{hobby}です。',
    '休日は{hobby}をして過ごすことが多いです。'
  ],
  casual: [
    '趣味は{hobby}！',
    'オフの日は{hobby}してるよ！',
    '{hobby}が好き！同じ趣味の人いたら仲良くしてね。'
  ],
  humor: [
    '趣味は{hobby}。…え、意外？よく言われます。',
    'プライベートは{hobby}に全振りしてます。',
    '仕事以外の時間は{hobby}に捧げてます。人生短いですからね。'
  ],
  passionate: [
    '{hobby}が大好きで、休みの日はずっとやってます！',
    '趣味の{hobby}には本気です！仕事と同じくらい熱中してます！',
    '{hobby}に情熱を注いでます！語り出したら止まりません！'
  ]
};

// アピール
const APPEAL_TEMPLATES = {
  formal: [
    'ちなみに、{appeal}',
    'また、{appeal}',
    '余談ですが、{appeal}'
  ],
  casual: [
    'あと、{appeal}',
    'ちなみに{appeal}',
    'あ、そうそう、{appeal}'
  ],
  humor: [
    'どうでもいい情報ですが、{appeal}',
    'ここだけの話、{appeal}',
    '聞いてないかもですが、{appeal}'
  ],
  passionate: [
    'そして何より、{appeal}',
    'さらに言うと、{appeal}',
    'もう一つ！{appeal}'
  ]
};

// 締め
const CLOSINGS = {
  business: {
    formal: [
      'どうぞよろしくお願いいたします。',
      '今後ともよろしくお願いいたします。',
      'お力になれることがあれば、お気軽にお声がけください。'
    ],
    casual: [
      'よろしくお願いします！',
      '気軽に声かけてくださいね！',
      '一緒に頑張りましょう！'
    ],
    humor: [
      'よろしくお願いします！覚えてもらえたら勝ちです。',
      'どうぞお手柔らかに！',
      'よろしくお願いします。名刺切れたので心のQRコードで！'
    ],
    passionate: [
      'よろしくお願いします！一緒に最高の成果を出しましょう！',
      '全力で頑張ります！よろしくお願いします！',
      'ぜひ一緒にいい仕事しましょう！'
    ]
  },
  sns: {
    formal: [
      'フォローしていただけると嬉しいです。',
      'よろしければ繋がってください。',
      '発信を通じて皆さんのお役に立てれば幸いです。'
    ],
    casual: [
      'フォローしてくれたら喜びます！',
      '気軽に絡んでね〜！',
      'よかったらフォローしてね！'
    ],
    humor: [
      'フォローしたら何かいいことあるかも。ないかも。',
      'いいね押してくれたら今日一日ハッピーです。',
      'フォロー解除しないでね。泣いちゃうから。'
    ],
    passionate: [
      '一緒に成長していきましょう！フォローよろしく🔥',
      '毎日発信してるのでぜひフォローを！',
      '共感してくれたらフォロー嬉しいです！全力で返します！'
    ]
  },
  interview: {
    formal: [
      '本日はどうぞよろしくお願いいたします。',
      '精一杯お伝えさせていただきますので、よろしくお願いいたします。',
      '何卒よろしくお願い申し上げます。'
    ],
    casual: [
      'よろしくお願いします！精一杯頑張ります！',
      '今日はしっかりお話しさせてください！',
      'よろしくお願いします！'
    ],
    humor: [
      'よろしくお願いします！…緊張してますが、実力は本物です！',
      'よろしくお願いします。採用していただけたら、全力で恩返しします！',
      '今日の面接、楽しみにしてました！よろしくお願いします！'
    ],
    passionate: [
      '御社で活躍する未来が見えています！よろしくお願いします！',
      '全力でお伝えしますので、よろしくお願いします！',
      'この会社で成長したい！その想いを伝えに来ました！'
    ]
  },
  party: {
    formal: [
      '今日はよろしくお願いします。楽しい時間にしましょう。',
      'ぜひお気軽にお話しいただければと思います。',
      '今日は楽しみましょう。'
    ],
    casual: [
      '今日は楽しもう！気軽に話しかけてね！',
      'よろしく〜！乾杯！',
      '仲良くしてくれたら嬉しい！今日はよろしく！'
    ],
    humor: [
      'とりあえず乾杯しましょう！話はそれからだ！',
      '今日の目標：二日酔いにならない。よろしく！',
      '酔ったら面白くなるタイプです。よろしく！'
    ],
    passionate: [
      '今日は最高の夜にしよう！よろしく！！',
      '全力で楽しむぞ！！みんなよろしく！',
      '素敵な出会いに感謝！楽しみましょう！'
    ]
  },
  school: {
    formal: [
      'これからよろしくお願いします。',
      'みなさんとの時間を大切にしたいです。よろしくお願いします。',
      '一緒に頑張りましょう。よろしくお願いします。'
    ],
    casual: [
      'よろしくね〜！気軽に話しかけて！',
      '仲良くしてね！',
      '楽しい1年にしよう！よろしく！'
    ],
    humor: [
      'よろしく！お弁当のおかず交換は応相談です。',
      '友達になってくれる人、常時募集中です。よろしく！',
      'よろしく！ノート見せてくれたら一生の友です。'
    ],
    passionate: [
      '最高のクラスにしよう！よろしく！！',
      'みんなと過ごす時間、全力で楽しみたい！よろしく！',
      '一緒に最高の思い出作ろう！！'
    ]
  },
  presentation: {
    formal: [
      'それでは、本題に入らせていただきます。',
      '短い時間ですが、最後までお付き合いください。',
      'では、さっそく始めさせていただきます。'
    ],
    casual: [
      'じゃあ、さっそく始めるね！',
      'それでは本題いきましょう！',
      '前置きはこのへんで、本題いきます！'
    ],
    humor: [
      'さて、自己紹介で時間使いすぎました。本題いきます！',
      '…え？長い？すみません、本題いきます！',
      'はい、ここからが本番です！ついてきてくださいね。'
    ],
    passionate: [
      'では、今日一番伝えたいことをお話しします！',
      'ここから本題です！聞き逃さないでくださいね！',
      'さあ、始めましょう！最後まで楽しんでください！'
    ]
  }
};

// バリエーション用の接続詞
const CONNECTORS = {
  formal: ['また、', 'さらに、', '加えて、'],
  casual: ['あと、', 'それから、', 'ちなみに、'],
  humor: ['あと補足すると、', 'ついでに言うと、', 'もう一つだけ、'],
  passionate: ['そして！', 'さらに！', 'もう一つ！']
};

// ============================================
// UI制御
// ============================================

function goToStep(step) {
  // バリデーション
  if (step === 2) {
    const name = document.getElementById('input-name').value.trim();
    const job = document.getElementById('input-job').value.trim();
    if (!name || !job) {
      showError('step-1', '名前と職種は必須だよ！入力してね。');
      return;
    }
    state.name = name;
    state.job = job;
    state.experience = document.getElementById('input-experience').value;
    state.hobby = document.getElementById('input-hobby').value.trim();
  }

  // 全ステップ非表示
  document.querySelectorAll('.step-section').forEach(s => s.classList.add('hidden'));
  document.getElementById(`step-${step}`).classList.remove('hidden');

  // ステップインジケータ更新
  for (let i = 1; i <= 3; i++) {
    const indicator = document.getElementById(`step-indicator-${i}`);
    indicator.classList.remove('t-step--active', 't-step--done');
    if (i < step) indicator.classList.add('t-step--done');
    if (i === step) indicator.classList.add('t-step--active');

    const line = document.getElementById(`step-line-${i}`);
    if (line) {
      line.style.background = i < step ? 'var(--color-success)' : 'var(--color-border)';
    }
  }

  // スクロール
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectTone(el) {
  document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  state.tone = el.dataset.tone;
}

function toggleTag(el) {
  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    state.strengths = state.strengths.filter(s => s !== el.textContent);
  } else {
    if (state.strengths.length >= 3) return;
    el.classList.add('selected');
    state.strengths.push(el.textContent);
  }
  document.getElementById('tag-count').textContent = state.strengths.length;
}

function selectScene(el) {
  document.querySelectorAll('.scene-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  state.scene = el.dataset.scene;
}

function showError(stepId, msg) {
  const section = document.getElementById(stepId);
  let existing = section.querySelector('.error-msg');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.className = 'error-msg';
  div.innerHTML = `<i class="icon icon-alert-triangle icon--sm"></i>${msg}`;
  section.querySelector('.t-card').prepend(div);

  setTimeout(() => div.remove(), 3000);
}

// ============================================
// 生成ロジック
// ============================================

function generate() {
  // バリデーション
  if (!state.tone) {
    showError('step-2', 'トーンを選んでね！');
    return;
  }
  if (!state.scene) {
    showError('step-2', '用途を選んでね！');
    return;
  }

  state.appeal = document.getElementById('input-appeal').value.trim();

  goToStep(3);

  // ローディング表示
  document.getElementById('loading').classList.remove('hidden');
  document.getElementById('results').classList.add('hidden');

  // 擬似的な生成待ち
  setTimeout(() => {
    const results = generateTexts();
    renderResults(results);

    document.getElementById('loading').classList.add('hidden');
    document.getElementById('results').classList.remove('hidden');
  }, 1200);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillTemplate(template, data) {
  let text = template;
  Object.keys(data).forEach(key => {
    text = text.replace(new RegExp(`\\{${key}\\}`, 'g'), data[key]);
  });
  return text;
}

function formatStrengths(strengths, tone) {
  if (strengths.length === 0) return '';
  if (strengths.length === 1) return strengths[0];

  const connector = tone === 'formal' ? 'と' : '・';
  if (strengths.length === 2) return strengths.join(connector);
  return strengths.slice(0, -1).join('、') + connector + strengths[strengths.length - 1];
}

function generateOneText(variant) {
  const { name, job, experience, hobby, tone, strengths, scene, appeal } = state;
  const parts = [];
  const data = { name, job };

  // 1. 冒頭
  const openers = SCENE_OPENERS[scene]?.[tone] || SCENE_OPENERS.business[tone];
  parts.push(fillTemplate(pick(openers), data));

  // 2. 職種・経験
  const expText = EXP_TEXT[experience] || '';
  data.exp = expText;
  if (experience) {
    const expPhrase = pick(EXP_PHRASE[experience] || ['']);
    // バリエーションによって職種紹介の文を変える
    const jobIntros = JOB_INTRO[tone];
    const jobText = fillTemplate(jobIntros[variant % jobIntros.length], data);
    parts.push(jobText);
  } else {
    const simpleJob = tone === 'formal'
      ? `${job}として活動しております。`
      : tone === 'casual'
      ? `${job}をやってます！`
      : tone === 'humor'
      ? `${job}やってます。楽しいですよ、たぶん。`
      : `${job}に全力で取り組んでいます！`;
    parts.push(simpleJob);
  }

  // 3. 強み
  if (strengths.length > 0) {
    const strengthText = formatStrengths(strengths, tone);
    data.strengths = strengthText;
    const templates = STRENGTH_TEMPLATES[tone];
    parts.push(fillTemplate(templates[variant % templates.length], data));
  }

  // 4. 趣味
  if (hobby) {
    data.hobby = hobby;
    const templates = HOBBY_TEMPLATES[tone];
    parts.push(fillTemplate(templates[variant % templates.length], data));
  }

  // 5. 一言アピール
  if (appeal) {
    data.appeal = appeal;
    const templates = APPEAL_TEMPLATES[tone];
    parts.push(fillTemplate(templates[variant % templates.length], data));
  }

  // 6. 締め
  const closings = CLOSINGS[scene]?.[tone] || CLOSINGS.business[tone];
  parts.push(pick(closings));

  return parts.join('\n');
}

function generateTexts() {
  const results = [];
  const labels = getVariantLabels();

  for (let i = 0; i < 3; i++) {
    results.push({
      label: labels[i],
      text: generateOneText(i)
    });
  }

  return results;
}

function getVariantLabels() {
  const { scene } = state;
  switch (scene) {
    case 'business': return ['スタンダード', 'スマート', '印象に残る'];
    case 'sns': return ['プロフ向き', 'フレンドリー', '個性派'];
    case 'interview': return ['堅実派', 'バランス型', 'インパクト重視'];
    case 'party': return ['無難', 'フランク', 'つかみOK'];
    case 'school': return ['優等生タイプ', '親しみタイプ', 'ムードメーカー'];
    case 'presentation': return ['王道', 'カジュアル', 'つかみ系'];
    default: return ['パターン1', 'パターン2', 'パターン3'];
  }
}

// ============================================
// 結果表示
// ============================================

function renderResults(results) {
  const container = document.getElementById('result-cards');
  container.innerHTML = '';

  results.forEach((r, i) => {
    const charCount = r.text.length;
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <div class="result-card__header">
        <div class="result-card__label">
          <span class="result-card__number">${i + 1}</span>
          <span class="result-card__type">${r.label}</span>
        </div>
        <span class="result-card__length">${charCount}文字</span>
      </div>
      <div class="result-card__text">${escapeHtml(r.text)}</div>
      <div class="result-card__actions">
        <button class="copy-btn" onclick="copyText(this, ${i})">
          <i class="icon icon-copy icon--sm"></i>
          コピーする
        </button>
      </div>
    `;
    container.appendChild(card);
  });

  // シェアリンク更新
  const shareText = encodeURIComponent('自己紹介ジェネレーターで自己紹介作ったよ！\n\nhttps://techio-code.github.io/jikoshokai-generator/\n\n#自己紹介ジェネレーター');
  document.getElementById('share-x').href = `https://x.com/intent/tweet?text=${shareText}`;

  // 結果を保存（コピー用）
  window._results = results;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
}

function copyText(btn, index) {
  const text = window._results[index].text;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = '<i class="icon icon-check icon--sm"></i> コピーしたよ！';
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = '<i class="icon icon-copy icon--sm"></i> コピーする';
    }, 2000);
  });
}
