/* Driftline original emoji set. Every colour follows the user's accent (--accent, --accent-2, --accent-3). */
(function(){
  var INK = '#161A22', RED = '#E5484D', AMB = '#F5B63A', GRN = '#2FB36D', W = '#fff';
  var G = '<defs><linearGradient id="g__ID__" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" style="stop-color:var(--accent-2,#6AA3FF)"/><stop offset=".55" style="stop-color:var(--accent,#1D6FF2)"/><stop offset="1" style="stop-color:var(--accent-3,#1550B8)"/></linearGradient></defs>';
  var S = function(inner){ return '<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">' + inner + '</svg>'; };
  var CP = '<clipPath id="c__ID__"><circle cx="32" cy="32" r="29"/></clipPath>';
  var base = function(inner){ return S(G + CP + '<circle cx="32" cy="32" r="29" fill="url(#g__ID__)"/><ellipse cx="22" cy="16" rx="11" ry="5" fill="#fff" opacity=".2" transform="rotate(-24 22 16)"/><g clip-path="url(#c__ID__)">' + inner + '</g>'); };
  var eye = function(x, y, r){ r = r || 5.4; return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff"/><circle cx="' + (x + .6) + '" cy="' + (y + .8) + '" r="' + (r * .52) + '" fill="' + INK + '"/>'; };
  var arcUp = function(x, y){ return '<path d="M' + (x - 5.5) + ' ' + (y + 2) + ' Q' + x + ' ' + (y - 6) + ' ' + (x + 5.5) + ' ' + (y + 2) + '" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>'; };
  var arcDn = function(x, y){ return '<path d="M' + (x - 5.5) + ' ' + (y - 1) + ' Q' + x + ' ' + (y + 6) + ' ' + (x + 5.5) + ' ' + (y - 1) + '" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>'; };
  var line = function(x, y){ return '<path d="M' + (x - 5) + ' ' + y + ' H' + (x + 5) + '" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>'; };
  var E2 = function(f, r){ return f(21, 27, r) + f(43, 27, r); };
  var stroke = function(d, w){ return '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="' + (w || 3.2) + '" stroke-linecap="round" stroke-linejoin="round"/>'; };
  var smile = stroke('M20 40 Q32 51 44 40'), grin = '<path d="M17 38 Q32 58 47 38 Z" fill="#fff"/><path d="M23 44 Q32 50 41 44 Q32 47 23 44Z" fill="var(--accent-3,#1550B8)" opacity=".35"/>';
  var open = '<ellipse cx="32" cy="45" rx="6" ry="7.5" fill="' + INK + '"/>';
  var frown = stroke('M21 47 Q32 38 43 47'), flat = stroke('M23 43 H41');
  var brow = function(x1, y1, x2, y2){ return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="' + INK + '" stroke-width="3.4" stroke-linecap="round"/>'; };
  var cheeks = '<ellipse cx="14" cy="38" rx="4.5" ry="3" fill="#fff" opacity=".28"/><ellipse cx="50" cy="38" rx="4.5" ry="3" fill="#fff" opacity=".28"/>';
  var tear = function(x, y){ return '<path d="M' + x + ' ' + y + ' q-4 6 0 9 q4-3 0-9z" fill="#fff" opacity=".9"/>'; };
  var badge = function(glyph, fill){ return S(G + CP + '<circle cx="32" cy="32" r="29" fill="url(#g__ID__)"/><ellipse cx="22" cy="16" rx="11" ry="5" fill="#fff" opacity=".2" transform="rotate(-24 22 16)"/><g clip-path="url(#c__ID__)">' + glyph + '</g>'); };
  var heartPath = 'M32 54 C10 40 8 24 18 17 C25 12 31 16 32 21 C33 16 39 12 46 17 C56 24 54 40 32 54Z';
  var starPath = function(cx, cy, R, r){ var p = [], i; for (i = 0; i < 10; i++){ var a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; p.push((cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy + rr * Math.sin(a)).toFixed(1)); } return 'M' + p.join(' L') + 'Z'; };
  var gloss = function(c){ return '<defs><linearGradient id="h__ID__" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/></linearGradient></defs>'; };

  var faces = [
    ['smile', 'smile', ['happy', 'glad', 'smiley', 'face'], E2(eye) + smile],
    ['grin', 'big grin', ['happy', 'teeth', 'joy'], E2(eye) + grin],
    ['laugh', 'laughing', ['lol', 'haha', 'funny', 'joy'], E2(arcUp) + grin + tear(10, 36) + tear(54, 36)],
    ['wink', 'wink', ['flirt', 'joke', 'playful'], eye(21, 27) + arcUp(43, 27) + smile],
    ['blush', 'blush', ['shy', 'cute', 'happy', 'sweet'], E2(arcUp) + smile + cheeks],
    ['cool', 'cool', ['sunglasses', 'chill', 'swag'], '<path d="M9 22 H55 V26 Q55 38 44 38 Q34 38 33 27 H31 Q30 38 20 38 Q9 38 9 26Z" fill="' + INK + '"/>' + stroke('M22 46 Q32 52 42 46')],
    ['love-eyes', 'love eyes', ['crush', 'adore', 'heart'], '<path d="M21 36 C10 28 12 20 17 20 C20 20 21 22 21 24 C21 22 22 20 25 20 C30 20 32 28 21 36Z" fill="' + RED + '"/><path d="M43 36 C32 28 34 20 39 20 C42 20 43 22 43 24 C43 22 44 20 47 20 C52 20 54 28 43 36Z" fill="' + RED + '"/>' + grin],
    ['thinking', 'thinking', ['hmm', 'wonder', 'consider'], E2(eye) + brow(14, 17, 27, 19) + stroke('M24 44 Q30 41 40 45')],
    ['neutral', 'neutral', ['meh', 'fine', 'flat'], E2(eye) + flat],
    ['sad', 'sad', ['unhappy', 'down', 'blue'], E2(eye) + brow(14, 17, 26, 21) + brow(50, 17, 38, 21) + frown],
    ['cry', 'crying', ['tears', 'sob', 'sad'], E2(eye) + frown + tear(17, 36) + tear(47, 36) + brow(14, 17, 26, 21) + brow(50, 17, 38, 21)],
    ['angry', 'angry', ['mad', 'furious', 'rage'], E2(eye, 4.4) + brow(13, 15, 27, 22) + brow(51, 15, 37, 22) + frown],
    ['surprised', 'surprised', ['wow', 'oh', 'gasp'], E2(eye, 6.4) + open],
    ['sleepy', 'sleepy', ['tired', 'zzz', 'sleep'], line(21, 29) + line(43, 29) + '<ellipse cx="32" cy="45" rx="4" ry="3" fill="' + INK + '"/><text x="46" y="16" font-family="system-ui" font-size="12" font-weight="800" fill="#fff">z</text>'],
    ['party', 'party', ['celebrate', 'birthday', 'fun'], E2(eye) + smile + '<path d="M32 -2 L20 18 H44Z" fill="' + AMB + '" transform="translate(0 4)"/><circle cx="32" cy="3" r="3.2" fill="#fff"/><circle cx="10" cy="14" r="2" fill="' + AMB + '"/><circle cx="56" cy="22" r="2" fill="' + GRN + '"/>'],
    ['nerd', 'nerd', ['glasses', 'smart', 'geek'], '<circle cx="21" cy="28" r="8.5" fill="none" stroke="' + INK + '" stroke-width="3"/><circle cx="43" cy="28" r="8.5" fill="none" stroke="' + INK + '" stroke-width="3"/><path d="M29.5 28 H34.5" stroke="' + INK + '" stroke-width="3"/>' + eye(21, 28, 4) + eye(43, 28, 4) + smile],
    ['silly', 'silly', ['tongue', 'goofy', 'playful'], eye(20, 26, 4.5) + eye(44, 25, 7) + stroke('M20 40 Q32 48 44 40') + '<path d="M28 43 q4 12 9 0z" fill="' + AMB + '"/>'],
    ['shy', 'shy', ['bashful', 'nervous', 'cute'], '<circle cx="21" cy="29" r="5" fill="#fff"/><circle cx="21.8" cy="31" r="2.6" fill="' + INK + '"/><circle cx="43" cy="29" r="5" fill="#fff"/><circle cx="43.8" cy="31" r="2.6" fill="' + INK + '"/>' + stroke('M26 44 Q32 48 38 44') + cheeks],
    ['relieved', 'relieved', ['phew', 'calm', 'content'], E2(arcDn) + stroke('M22 42 Q32 49 42 42') + cheeks],
    ['worried', 'worried', ['nervous', 'anxious', 'uneasy'], E2(eye) + brow(14, 20, 26, 15) + brow(50, 20, 38, 15) + stroke('M21 46 Q26 42 32 46 Q38 50 43 46')],
    ['shocked', 'shocked', ['omg', 'scream', 'fear'], E2(eye, 6.8) + '<ellipse cx="32" cy="47" rx="8" ry="8.5" fill="' + INK + '"/><path d="M11 12 l6 6 M53 12 l-6 6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>'],
    ['hug', 'hug', ['warm', 'care', 'support'], E2(arcUp) + smile + '<path d="M6 44 Q20 62 32 56" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/><path d="M58 44 Q44 62 32 56" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/>'],
    ['sick', 'sick', ['ill', 'unwell', 'fever'], E2(eye, 4.2) + stroke('M20 45 Q24 41 28 45 Q32 49 36 45 Q40 41 44 45') + '<rect x="40" y="6" width="5" height="22" rx="2.5" fill="#fff" transform="rotate(35 42 17)"/><circle cx="52" cy="26" r="3.6" fill="' + RED + '"/>'],
    ['zen', 'calm', ['peace', 'relax', 'meditate'], E2(arcDn) + stroke('M23 41 Q32 46 41 41') + '<ellipse cx="32" cy="5" rx="12" ry="3.4" fill="none" stroke="' + AMB + '" stroke-width="3"/>']
  ];
  var tg = function(c){ return '<g>' + c + '</g>'; };
  var gestures = [
    ['thumbs-up', 'thumbs up', ['yes', 'good', 'like', 'approve'], badge('<path d="M17 29 H24 V47 H17Z" fill="#fff"/><path d="M27 29 L33 16 Q38 15 38 21 V27 H46 Q50 27 49.3 31 L47 44 Q46.4 47 43 47 H27Z" fill="#fff"/>')],
    ['thumbs-down', 'thumbs down', ['no', 'bad', 'dislike'], badge('<g transform="rotate(180 32 32)"><path d="M17 29 H24 V47 H17Z" fill="#fff"/><path d="M27 29 L33 16 Q38 15 38 21 V27 H46 Q50 27 49.3 31 L47 44 Q46.4 47 43 47 H27Z" fill="#fff"/></g>')],
    ['clap', 'clap', ['applause', 'bravo', 'congrats'], badge('<path d="M20 40 L28 22 Q31 19 33 22 L38 36 Q34 48 24 46Z" fill="#fff"/><path d="M33 44 L42 26 Q45 23 47 26 L50 36 Q47 47 38 49Z" fill="#fff" opacity=".85"/><path d="M14 18 l4 4 M30 10 v6 M46 14 l-3 4" stroke="' + AMB + '" stroke-width="3" stroke-linecap="round"/>')],
    ['wave', 'wave', ['hello', 'hi', 'bye', 'greeting'], badge('<path d="M24 46 Q18 36 22 30 L24 22 Q26 19 28 22 L28 30 V18 Q30 15 32 18 V30 V16 Q34 13 36 16 V30 V20 Q38 17 40 20 V38 Q40 48 31 50Q27 50 24 46Z" fill="#fff"/><path d="M8 24 Q4 32 8 40 M12 20 Q6 32 12 44" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>')],
    ['peace', 'peace', ['victory', 'two', 'v'], badge('<path d="M24 50 V36 L19 18 Q20 14 24 15 L30 32 L36 15 Q40 14 41 18 L36 36 V50Q36 54 30 54Q24 54 24 50Z" fill="#fff"/>')],
    ['strong', 'strong', ['muscle', 'power', 'flex', 'gym'], badge('<path d="M12 40 Q12 26 24 24 L26 18 Q30 14 34 18 L36 24 Q46 24 50 32 Q52 40 44 44 Q40 48 32 46 L22 50 Q12 50 12 40Z" fill="#fff"/>')]
  ];
  var sym = [
    ['heart', 'heart', ['love', 'like', 'red'], S(gloss([ '#FF7A7F', RED ]) + '<path d="' + heartPath + '" fill="url(#h__ID__)"/><ellipse cx="21" cy="22" rx="5" ry="3" fill="#fff" opacity=".45" transform="rotate(-30 21 22)"/>')],
    ['heart-broken', 'broken heart', ['sad', 'heartbreak', 'hurt'], S('<path d="' + heartPath + '" fill="' + RED + '"/><path d="M32 21 L27 30 L35 36 L29 46 L33 54" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>')],
    ['sparkles', 'sparkles', ['magic', 'new', 'shine', 'stars'], S(G + '<path d="M26 8 C27 22 30 26 44 28 C30 30 27 34 26 48 C25 34 22 30 8 28 C22 26 25 22 26 8Z" fill="url(#g__ID__)"/><path d="M48 32 C48.6 40 50 42 56 43 C50 44 48.6 46 48 54 C47.4 46 46 44 40 43 C46 42 47.4 40 48 32Z" fill="' + AMB + '"/><circle cx="46" cy="12" r="3" fill="' + AMB + '"/>')],
    ['star', 'star', ['favourite', 'best', 'gold'], S(gloss(['#FFD66B', '#F0A21F']) + '<path d="' + starPath(32, 33, 28, 12.5) + '" fill="url(#h__ID__)" stroke="#F0A21F" stroke-width="2" stroke-linejoin="round"/>')],
    ['fire', 'fire', ['hot', 'lit', 'trending', 'flame'], S(gloss(['#FFC94D', '#F2601D']) + '<path d="M32 4 C34 16 46 20 46 36 C46 48 40 58 32 58 C23 58 17 50 17 40 C17 32 22 28 24 22 C27 26 28 29 30 30 C31 22 29 12 32 4Z" fill="url(#h__ID__)"/><path d="M32 58 C26 58 24 52 26 47 C28 43 31 41 32 36 C34 41 38 44 38 50 C38 55 36 58 32 58Z" fill="#FFE9A8"/>')],
    ['bolt', 'lightning', ['energy', 'fast', 'power'], S(gloss(['#FFD66B', '#F0A21F']) + '<path d="M37 3 L14 36 H29 L25 61 L50 26 H34Z" fill="url(#h__ID__)" stroke="#E0900F" stroke-width="2" stroke-linejoin="round"/>')],
    ['check', 'check', ['done', 'yes', 'ok', 'correct'], badge('<path d="M18 33 L28 43 L47 21" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>')],
    ['cross', 'cross', ['no', 'wrong', 'close', 'x'], S('<circle cx="32" cy="32" r="29" fill="' + RED + '"/><path d="M21 21 L43 43 M43 21 L21 43" stroke="#fff" stroke-width="7" stroke-linecap="round"/>')],
    ['question', 'question', ['help', 'ask', 'why'], badge('<path d="M23 25 Q23 16 32 16 Q41 16 41 24 Q41 29 35 32 Q32 34 32 38" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="32" cy="49" r="4" fill="#fff"/>')],
    ['exclamation', 'exclamation', ['alert', 'important', 'warning'], S('<circle cx="32" cy="32" r="29" fill="' + AMB + '"/><path d="M32 14 V37" stroke="' + INK + '" stroke-width="7" stroke-linecap="round"/><circle cx="32" cy="49" r="4.2" fill="' + INK + '"/>')],
    ['rocket', 'rocket', ['launch', 'fast', 'ship', 'space'], badge('<path d="M32 8 Q46 18 44 36 L38 44 H26 L20 36 Q18 18 32 8Z" fill="#fff"/><circle cx="32" cy="26" r="5" fill="var(--accent,#1D6FF2)"/><path d="M20 34 L12 46 L24 44Z M44 34 L52 46 L40 44Z" fill="#fff" opacity=".85"/><path d="M28 48 Q32 60 36 48Z" fill="' + AMB + '"/>')],
    ['music-note', 'music', ['song', 'sound', 'tune'], badge('<path d="M26 44 V16 L46 11 V38" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="21" cy="45" rx="7" ry="5.5" fill="#fff"/><ellipse cx="41" cy="39" rx="7" ry="5.5" fill="#fff"/>')],
    ['gift', 'gift', ['present', 'surprise', 'birthday'], badge('<rect x="14" y="26" width="36" height="24" rx="3" fill="#fff"/><rect x="12" y="20" width="40" height="9" rx="3" fill="#fff"/><path d="M32 20 V50" stroke="var(--accent,#1D6FF2)" stroke-width="5"/><path d="M32 20 C26 8 16 12 22 18 C25 20 30 20 32 20Z M32 20 C38 8 48 12 42 18 C39 20 34 20 32 20Z" fill="' + AMB + '"/>')],
    ['trophy', 'trophy', ['win', 'champion', 'award', 'prize'], S(gloss(['#FFD66B', '#E8A317']) + '<path d="M18 10 H46 V24 Q46 38 32 40 Q18 38 18 24Z" fill="url(#h__ID__)"/><path d="M18 14 H8 Q8 28 20 30 M46 14 H56 Q56 28 44 30" fill="none" stroke="#E8A317" stroke-width="4" stroke-linecap="round"/><rect x="28" y="40" width="8" height="10" fill="#E8A317"/><rect x="20" y="50" width="24" height="8" rx="3" fill="url(#h__ID__)"/>')],
    ['sun', 'sun', ['day', 'bright', 'weather', 'summer'], S(gloss(['#FFD66B', '#F5A623']) + '<circle cx="32" cy="32" r="13" fill="url(#h__ID__)"/><g stroke="#F5B63A" stroke-width="4" stroke-linecap="round"><path d="M32 6 V13 M32 51 V58 M6 32 H13 M51 32 H58 M14 14 L19 19 M45 45 L50 50 M50 14 L45 19 M19 45 L14 50"/></g>')],
    ['moon', 'moon', ['night', 'sleep', 'dark'], S(gloss(['#FFE7A0', '#F2B84B']) + '<path d="M40 6 A26 26 0 1 0 58 40 A21 21 0 0 1 40 6Z" fill="url(#h__ID__)"/><circle cx="52" cy="14" r="2.5" fill="' + AMB + '"/>')]
  ];
  var drift = [
    ['drift-logo', 'Driftline', ['driftline', 'brand', 'wave', 'logo'], badge('<path d="M12 38 Q20 24 28 34 T44 30 T54 24" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M12 48 Q22 38 30 46 T52 40" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>')],
    ['pip-apple', 'Pip', ['pip', 'apple', 'assistant', 'ai', 'bot'], S(G + '<path d="M32 17 C26 11 11 13 8 31 C5 48 17 62 25 61 C29 61 30 59 32 59 C34 59 35 61 39 61 C47 62 59 48 56 31 C53 13 38 11 32 17Z" fill="url(#g__ID__)"/><path d="M32 17 C32 11 34 7 38 4" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/><path d="M36 11 C40 2 50 2 55 5 C52 14 43 16 36 11Z" fill="' + GRN + '"/><ellipse cx="19" cy="27" rx="5" ry="8" fill="#fff" opacity=".22" transform="rotate(18 19 27)"/><circle cx="24" cy="38" r="3.4" fill="' + INK + '"/><circle cx="40" cy="38" r="3.4" fill="' + INK + '"/><path d="M27 46 Q32 50 37 46" fill="none" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>')],
    ['biscly-bubble', 'Biscly', ['biscly', 'community', 'friends', 'public', 'chat'], badge('<path d="M12 14 H38 Q42 14 42 18 V32 Q42 36 38 36 H26 L18 43 V36 H16 Q12 36 12 32Z" fill="#fff"/><path d="M46 24 H48 Q52 24 52 28 V40 Q52 44 48 44 H46 V50 L39 44 H28 Q25 44 24.5 41" fill="#fff" opacity=".7"/>')],
    ['connected', 'connected', ['link', 'friends', 'join', 'network'], badge('<circle cx="16" cy="32" r="8" fill="#fff"/><circle cx="48" cy="32" r="8" fill="#fff"/><path d="M24 32 H40" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 9"/><circle cx="32" cy="32" r="3.4" fill="#fff"/>')],
    ['call', 'call', ['phone', 'voice', 'ring'], badge('<path d="M20 12 L28 14 L30 24 L25 28 Q29 37 38 41 L42 36 L52 38 L54 46 Q52 54 44 54 Q24 52 12 32 Q10 14 20 12Z" fill="#fff"/>')],
    ['video-call', 'video call', ['camera', 'video', 'meet'], badge('<rect x="10" y="19" width="30" height="26" rx="6" fill="#fff"/><path d="M42 28 L54 20 V44 L42 36Z" fill="#fff"/>')],
    ['group', 'group', ['people', 'team', 'friends', 'crowd'], badge('<circle cx="32" cy="22" r="7" fill="#fff"/><path d="M19 48 Q19 33 32 33 Q45 33 45 48Z" fill="#fff"/><circle cx="15" cy="27" r="5" fill="#fff" opacity=".7"/><circle cx="49" cy="27" r="5" fill="#fff" opacity=".7"/><path d="M6 46 Q6 36 15 36 M58 46 Q58 36 49 36" fill="none" stroke="#fff" stroke-width="4" opacity=".7" stroke-linecap="round"/>')],
    ['lock', 'lock', ['private', 'secure', 'safe', 'sealed'], badge('<rect x="15" y="28" width="34" height="26" rx="6" fill="#fff"/><path d="M22 28 V22 Q22 12 32 12 Q42 12 42 22 V28" fill="none" stroke="#fff" stroke-width="5"/><circle cx="32" cy="40" r="4" fill="var(--accent,#1D6FF2)"/>')],
    ['bell', 'bell', ['alert', 'notification', 'ring'], badge('<path d="M32 10 Q44 10 44 26 V36 L50 44 H14 L20 36 V26 Q20 10 32 10Z" fill="#fff"/><path d="M26 48 Q32 56 38 48Z" fill="#fff"/>')],
    ['link', 'link', ['url', 'chain', 'connect'], badge('<path d="M27 37 Q21 37 19 31 Q17 25 23 21 L29 17 Q35 14 39 19 M37 27 Q43 27 45 33 Q47 39 41 43 L35 47 Q29 50 25 45" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>')],
    ['globe', 'globe', ['world', 'web', 'internet', 'earth'], badge('<circle cx="32" cy="32" r="20" fill="none" stroke="#fff" stroke-width="4"/><ellipse cx="32" cy="32" rx="9" ry="20" fill="none" stroke="#fff" stroke-width="3.4"/><path d="M12 32 H52 M16 21 H48 M16 43 H48" stroke="#fff" stroke-width="3"/>')],
    ['chat', 'chat', ['message', 'talk', 'speech'], badge('<path d="M17 17 H47 V40 H31 L22 49 V40 H17Z" fill="#fff" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><circle cx="25" cy="29" r="2.8" fill="var(--accent,#1D6FF2)"/><circle cx="32" cy="29" r="2.8" fill="var(--accent,#1D6FF2)"/><circle cx="40" cy="28" r="3" fill="var(--accent,#1D6FF2)"/>')]
  ];

  /* v3.2 redraw: every feature sits inside the circle so nothing is chopped */
  var MOUTH = '<path d="M19 37 H45 Q45 52 32 52 Q19 52 19 37Z" fill="#fff"/><path d="M25 48 Q32 43.5 39 48 Q36 51.5 32 51.5 Q28 51.5 25 48Z" fill="var(--accent-3,#1550B8)" opacity=".4"/>';
  var FIX = {
    'grin': function(){ return base(E2(eye) + MOUTH); },
    'laugh': function(){ return base(E2(arcUp) + MOUTH + tear(12, 33) + tear(52, 33)); },
    'shocked': function(){ return base(E2(eye, 6.4) + '<path d="M13 14 Q21 9 28 14 M36 14 Q43 9 51 14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/><ellipse cx="32" cy="46" rx="6.5" ry="8.5" fill="' + INK + '"/>'); },
    'sleepy': function(){ return base(line(21, 28) + line(43, 28) + '<ellipse cx="32" cy="44" rx="4.5" ry="3.4" fill="' + INK + '"/><text x="43" y="19" font-size="13" font-weight="800" fill="#fff" font-family="Arial,sans-serif">z</text><text x="49" y="13" font-size="9" font-weight="800" fill="#fff" font-family="Arial,sans-serif">z</text>'); },
    'party': function(){ return base(E2(eye) + smile + '<path d="M32 6 L42 21 H22Z" fill="' + AMB + '"/><circle cx="32" cy="6" r="2.8" fill="#fff"/><path d="M26 17 H38" stroke="#fff" stroke-width="2" opacity=".7"/>'); },
    'relieved': function(){ return base(E2(arcDn) + smile + '<ellipse cx="32" cy="8" rx="10" ry="3" fill="none" stroke="' + AMB + '" stroke-width="2.6"/>'); },
    'hug': function(){ return base(E2(arcUp) + smile + cheeks + '<path d="M8 56 Q18 44 30 52 M56 56 Q46 44 34 52" fill="none" stroke="#fff" stroke-width="4.4" stroke-linecap="round"/>'); },
    'sick': function(){ return base(line(21, 28) + line(43, 28) + stroke('M20 45 Q26 40 32 45 T44 45') + tear(51, 14)); },
    'clap': function(){ return badge('<g transform="rotate(-24 22 40)"><rect x="11" y="24" width="18" height="27" rx="8" fill="#fff"/></g><g transform="rotate(24 42 40)"><rect x="35" y="24" width="18" height="27" rx="8" fill="#fff" opacity=".88"/></g><path d="M32 7 V15 M19 11 L23 18 M45 11 L41 18" stroke="#fff" stroke-width="3.4" stroke-linecap="round"/>'); },
    'wave': function(){ return badge('<rect x="17" y="30" width="30" height="23" rx="11" fill="#fff"/><path d="M23 34 V21 M29.5 32 V14 M36 32 V14 M42.5 34 V21" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M19 43 L11 34" stroke="#fff" stroke-width="6" stroke-linecap="round"/>'); },
    'peace': function(){ return badge('<rect x="19" y="32" width="26" height="21" rx="10" fill="#fff"/><path d="M27 35 L22 15 M37 35 L42 15" stroke="#fff" stroke-width="6.4" stroke-linecap="round"/>'); },
    'strong': function(){ return badge('<rect x="16" y="23" width="32" height="27" rx="10" fill="#fff"/><path d="M26 24 V36 M32 24 V36 M38 24 V36" stroke="var(--accent-3,#1550B8)" stroke-width="1.8" opacity=".45" stroke-linecap="round"/><ellipse cx="22" cy="45" rx="9" ry="6" fill="#fff"/>'); }
  };
  var CATS = [{ id:'faces', name:'Faces', items:faces }, { id:'gestures', name:'Gestures', items:gestures }, { id:'symbols', name:'Symbols and fun', items:sym }, { id:'driftline', name:'Driftline', items:drift }]
    .map(function(c){ return { id:c.id, name:c.name, items:c.items.map(function(a){ return { id:a[0], name:a[1], keywords:a[2], shortcode:':' + a[0] + ':', svg:(FIX[a[0]] ? FIX[a[0]]() : (String(a[3]).indexOf('<svg') === 0 ? a[3] : base(a[3]))) }; }) }; });
  var ALL = [], BY = {}; CATS.forEach(function(c){ c.items.forEach(function(it){ ALL.push(it); BY[it.id] = it; }); });
  var counter = 0;
  function render(id, size){ var it = BY[id]; if (!it) return ''; counter++; var px = size || 24; return it.svg.replace(/__ID__/g, 'e' + counter).replace('<svg ', '<svg class="dl-emoji" role="img" aria-label="' + it.name + '" width="' + px + '" height="' + px + '" '); }
  function find(q){ q = String(q || '').toLowerCase().trim(); if (!q) return ALL.slice(); return ALL.filter(function(it){ return it.id.indexOf(q) === 0 || it.name.toLowerCase().indexOf(q) >= 0 || it.keywords.some(function(k){ return k.indexOf(q) === 0; }); }); }
  function replaceShortcodes(html, size){ return String(html).replace(/:([a-z0-9-]+):/g, function(m, id){ return BY[id] ? render(id, size) : m; }); }
  window.DL_EMOJI = { version:1, categories:CATS, all:ALL, byId:BY, find:find, render:render, shortcodeRegex:/:([a-z0-9-]+):/g, replaceShortcodes:replaceShortcodes };
})();
