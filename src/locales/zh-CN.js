export default {
  app: { title: '开发工具箱', footer: '开发工具箱' },
  sponsor: {
    title: '赞赏支持',
    desc: '如果这些工具对你有帮助，欢迎赞赏支持开发者 ☕',
    wechat: '微信赞赏',
    wechatDesc: '打开微信扫一扫',
    alipay: '支付宝赞赏',
    alipayDesc: '打开支付宝扫一扫',
    uploadQr: '上传收款码',
    clickUpload: '点击上传',
    thanks: '感谢你的支持！每一份赞赏都是对开源工具的巨大鼓励 ❤️',
    githubDesc: '海外用户可以通过 GitHub Sponsors 支持',
    githubButton: 'GitHub Sponsors'
  },
  home: {
    heroTitle: '开发工具箱', heroDesc: '一站式开发工具集，所有数据本地处理，安全可靠',
    tools: {
      jsonFormatter: { name: 'JSON 美化', desc: 'JSON 格式化、压缩、校验，让数据结构一目了然' },
      codec: { name: '编码转换', desc: 'Unicode、UTF-8、Base64、MD5、SHA1、JWT 等多种编码转换' },
      timestamp: { name: '时间戳计算', desc: '时间戳与标准时间互转，支持多种时间格式' },
      qrcode: { name: '二维码生成', desc: '链接/文本转二维码，支持下载保存' },
      password: { name: '随机密码生成器', desc: '自定义密码长度和字符类型，批量生成安全密码' },
      diff: { name: '内容对比', desc: 'JSON 对比 & 文本对比，差异高亮一目了然' },
      imageBase64: { name: '图片转Base64', desc: '图片文件转 Base64 编码，支持 Data URI、HTML、CSS 格式' },
      crontab: { name: 'Crontab 工具', desc: '可视化 Crontab 表达式生成与解析，编辑时高亮提示' }
    }
  },
  nav: {
    jsonFormatter: 'JSON 美化', codec: '编码转换', timestamp: '时间戳计算', qrcode: '二维码生成',
    password: '密码生成器', diff: '内容对比', imageBase64: '图片转Base64', crontab: 'Crontab',
    sponsor: '赞赏'
  },
  jsonFormatter: {
    title: 'JSON 美化', desc: 'JSON 格式化、压缩与校验工具',
    input: '输入 JSON', output: '输出结果',
    placeholder: '请输入 JSON 字符串，例如：{"name":"张三","age":25}',
    resultPlaceholder: '格式化结果将显示在这里',
    clear: '清空', format: '格式化', compress: '压缩', validate: '校验', copy: '复制',
    copied: '已复制到剪贴板', parseError: 'JSON 解析错误', emptyInput: '请输入 JSON 字符串',
    formatSuccess: '格式化成功', compressSuccess: '压缩成功', validJson: 'JSON 格式正确', invalidJson: 'JSON 格式错误'
  },
  codec: {
    title: '编码转换', desc: '支持 Unicode、UTF-8、UTF-16、URL、Base64、MD5、SHA1、Hex、JWT、Cookie 编码转换',
    input: '输入内容', output: '输出结果', clear: '清空', copy: '复制', copied: '已复制到剪贴板',
    convertError: '转换失败', emptyInput: '请输入内容', invalidJwt: '无效的 JWT 格式', resultPlaceholder: '转换结果将显示在这里',
    types: {
      base64Encode: 'Base64 编码', base64Decode: 'Base64 解码', urlEncode: 'URL 编码', urlDecode: 'URL 解码',
      unicodeDecode: 'Unicode→中文', unicodeEncode: '中文→Unicode', hexEncode: 'Hex 编码', hexDecode: 'Hex 解码',
      md5: 'MD5', sha1: 'SHA1', sha256: 'SHA256', jwtDecode: 'JWT 解码', cookieParse: 'Cookie 解析',
      utf8Encode: 'UTF-8 编码', utf8Decode: 'UTF-8 解码', utf16Encode: 'UTF-16 编码', utf16Decode: 'UTF-16 解码'
    },
    placeholders: {
      base64Encode: '输入要编码的文本...', base64Decode: '输入 Base64 字符串...',
      urlEncode: '输入要编码的 URL 或文本...', urlDecode: '输入 URL 编码后的字符串...',
      unicodeDecode: '输入 Unicode 编码，如 \\u4e2d\\u6587...', unicodeEncode: '输入中文或其他文本...',
      hexEncode: '输入要转为 Hex 的文本...', hexDecode: '输入 Hex 字符串...',
      md5: '输入要计算 MD5 的文本...', sha1: '输入要计算 SHA1 的文本...', sha256: '输入要计算 SHA256 的文本...',
      jwtDecode: '输入 JWT Token...', cookieParse: '输入 Cookie 字符串...',
      utf8Encode: '输入文本...', utf8Decode: '输入 UTF-8 编码字节...',
      utf16Encode: '输入文本...', utf16Decode: '输入 UTF-16 编码...'
    }
  },
  timestamp: {
    title: '时间戳计算', desc: '时间戳与标准时间互转，支持秒/毫秒级时间戳',
    currentTime: '当前时间', localTime: '本地时间', utcTime: 'UTC 时间',
    tsSeconds: '秒级时间戳', tsMilliseconds: '毫秒级时间戳', iso8601: 'ISO 8601', weekday: '星期',
    weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    tsToDate: '时间戳 → 标准时间', dateToTs: '标准时间 → 时间戳', freeParse: '其他格式时间解析',
    tsPlaceholder: '输入时间戳（秒或毫秒）', autoDetect: '自动检测', seconds: '秒', milliseconds: '毫秒',
    convert: '转换', parse: '解析', selectDate: '选择日期时间',
    freePlaceholder: '输入任意时间格式，如 2024-01-15、01/15/2024、Jan 15 2024...',
    cannotParse: '无法解析该时间格式，请尝试其他格式', copied: '已复制'
  },
  qrcode: {
    title: '二维码生成', desc: '将链接或文本内容生成二维码，支持下载保存',
    inputLabel: '输入内容：', inputPlaceholder: '输入网址链接或任意文本内容...',
    sizeLabel: '二维码尺寸：', errorLevel: '容错级别：', generate: '生成二维码',
    result: '二维码结果', download: '下载 PNG', copyImage: '复制图片',
    downloadSuccess: '下载成功', copySuccess: '已复制到剪贴板', copyFailed: '复制失败，请下载后使用', generateFailed: '生成失败'
  },
  password: {
    title: '随机密码生成器', desc: '自定义密码长度和字符类型，批量生成安全密码',
    length: '密码长度：', lengthHint: '（4-64 位）', count: '生成数量：', countHint: '（1-50 个）',
    charTypes: '字符类型：', digits: '数字 0-9', lowercase: '小写字母 a-z', uppercase: '大写字母 A-Z', symbols: '特殊符号 !@#$%^&*',
    generate: '生成密码', generated: '生成的密码', copyAll: '复制全部', regenerate: '重新生成',
    copied: '已复制', copiedAll: '已复制全部密码', strength: { strong: '很强', medium: '中等', weak: '较弱' }
  },
  diff: {
    title: '内容对比', desc: 'JSON 对比 & 文本对比，差异高亮一目了然',
    textDiff: '文本对比', jsonDiff: 'JSON 对比', leftInput: '原始内容', rightInput: '对比内容', clear: '清空',
    leftPlaceholder: '输入原始 JSON...', rightPlaceholder: '输入对比 JSON...',
    leftTextPlaceholder: '输入原始文本...', rightTextPlaceholder: '输入对比文本...',
    same: '相同', added: '新增', removed: '删除', modified: '修改', lines: '行',
    emptyInput: '请输入对比内容', jsonError: 'JSON 格式错误'
  },
  imageBase64: {
    title: '图片转 Base64', desc: '将图片文件转换为 Base64 编码字符串，支持常见图片格式',
    upload: '上传图片', uploadHint: '支持 JPG、PNG、GIF、SVG、WebP、BMP',
    dropText: '将图片拖到此处，或', clickUpload: '点击上传',
    result: 'Base64 结果', resultPlaceholder: '转换结果将显示在这里',
    pureBase64: '纯Base64', dataUri: 'Data URI', html: 'HTML', css: 'CSS',
    copy: '复制', download: '下载', copied: '已复制', downloadSuccess: '下载成功',
    fileTooBig: '文件过大，请选择小于 20MB 的图片', readFailed: '读取文件失败',
    chars: '字符', kChars: 'K 字符'
  },
  crontab: {
    title: 'Crontab 工具', desc: '可视化 Crontab 表达式生成与解析，编辑时高亮提示',
    exprLabel: 'Crontab 表达式：', minute: '分钟', hour: '小时', day: '日', month: '月', week: '星期',
    randomDemo: '随机示例', copy: '复制', copied: '已复制', valid: '有效', invalid: '无效',
    presets: '快捷预设', fieldDesc: '字段说明', range: '取值范围', preview: '执行时间预览',
    nextRuns: '接下来 10 次执行时间：', computing: '计算中...', enterValid: '请输入有效的 Crontab 表达式',
    presetsList: ['每分钟', '每5分钟', '每小时', '每天0点', '每天8点', '工作日9点', '每周一0点', '每月1号0点', '每15分钟', '每6小时', '每30分钟', '工作日每2小时'],
    fieldExamples: {
      minute: [{ val: '*', desc: '每分钟' }, { val: '*/5', desc: '每5分钟' }, { val: '0', desc: '第0分钟' }, { val: '0,30', desc: '0和30分' }, { val: '0-10', desc: '0到10分' }],
      hour: [{ val: '*', desc: '每小时' }, { val: '*/2', desc: '每2小时' }, { val: '0', desc: '0点' }, { val: '9,18', desc: '9点和18点' }, { val: '9-17', desc: '9点到17点' }],
      day: [{ val: '*', desc: '每天' }, { val: '1', desc: '每月1号' }, { val: '1,15', desc: '1号和15号' }, { val: '*/7', desc: '每7天' }, { val: 'L', desc: '月末' }],
      month: [{ val: '*', desc: '每月' }, { val: '1', desc: '1月' }, { val: '1,6', desc: '1月和6月' }, { val: '*/3', desc: '每3个月' }, { val: '1-6', desc: '1月到6月' }],
      week: [{ val: '*', desc: '每天' }, { val: '0', desc: '周日' }, { val: '1-5', desc: '周一至周五' }, { val: '0,6', desc: '周六和周日' }, { val: '*/2', desc: '每隔一天' }]
    },
    fieldRanges: { minute: '0-59', hour: '0-23', day: '1-31', month: '1-12', week: '0-7 (0=周日)' },
    errors: { minute: '分钟字段无效 (0-59)', hour: '小时字段无效 (0-23)', day: '日字段无效 (1-31)', month: '月字段无效 (1-12)', week: '星期字段无效 (0-7)' }
  }
}
