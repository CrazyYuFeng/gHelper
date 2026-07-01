export default {
  app: { title: 'Dev Toolbox', footer: 'Dev Toolbox' },
  sponsor: {
    title: 'Sponsor',
    desc: 'If these tools help you, consider buying the developer a coffee ☕',
    wechat: 'WeChat Sponsor',
    wechatDesc: 'Scan with WeChat',
    alipay: 'Alipay Sponsor',
    alipayDesc: 'Scan with Alipay',
    uploadQr: 'Upload QR code',
    clickUpload: 'Click to upload',
    thanks: 'Thank you for your support! Every contribution encourages open source ❤️',
    githubDesc: 'For international users, support via GitHub Sponsors',
    githubButton: 'GitHub Sponsors'
  },
  home: {
    heroTitle: 'Dev Toolbox', heroDesc: 'All-in-one developer tools. All data processed locally, safe & secure.',
    tools: {
      jsonFormatter: { name: 'JSON Formatter', desc: 'Format, compress, and validate JSON with clear structure' },
      codec: { name: 'Codec Converter', desc: 'Unicode, UTF-8, Base64, MD5, SHA1, JWT and more encoding conversions' },
      timestamp: { name: 'Timestamp Calculator', desc: 'Convert between timestamps and dates, supports multiple formats' },
      qrcode: { name: 'QR Code Generator', desc: 'Convert links/text to QR codes, download as PNG' },
      password: { name: 'Password Generator', desc: 'Custom length and character types, batch generate secure passwords' },
      diff: { name: 'Diff Checker', desc: 'JSON diff & text diff with highlighted differences' },
      imageBase64: { name: 'Image to Base64', desc: 'Convert images to Base64, supports Data URI, HTML, CSS formats' },
      crontab: { name: 'Crontab Tool', desc: 'Visual Crontab expression builder with field highlighting' }
    }
  },
  nav: {
    jsonFormatter: 'JSON Formatter', codec: 'Codec', timestamp: 'Timestamp', qrcode: 'QR Code',
    password: 'Password', diff: 'Diff', imageBase64: 'Image→Base64', crontab: 'Crontab',
    sponsor: 'Sponsor'
  },
  jsonFormatter: {
    title: 'JSON Formatter', desc: 'JSON format, compress & validate tool',
    input: 'Input JSON', output: 'Output',
    placeholder: 'Enter JSON string, e.g. {"name":"John","age":25}',
    resultPlaceholder: 'Formatted result will appear here',
    clear: 'Clear', format: 'Format', compress: 'Compress', validate: 'Validate', copy: 'Copy',
    copied: 'Copied to clipboard', parseError: 'JSON parse error', emptyInput: 'Please enter a JSON string',
    formatSuccess: 'Format successful', compressSuccess: 'Compress successful', validJson: 'Valid JSON', invalidJson: 'Invalid JSON'
  },
  codec: {
    title: 'Codec Converter', desc: 'Unicode, UTF-8, UTF-16, URL, Base64, MD5, SHA1, Hex, JWT, Cookie conversions',
    input: 'Input', output: 'Output', clear: 'Clear', copy: 'Copy', copied: 'Copied to clipboard',
    convertError: 'Conversion failed', emptyInput: 'Please enter content', invalidJwt: 'Invalid JWT format', resultPlaceholder: 'Result will appear here',
    types: {
      base64Encode: 'Base64 Encode', base64Decode: 'Base64 Decode', urlEncode: 'URL Encode', urlDecode: 'URL Decode',
      unicodeDecode: 'Unicode→Text', unicodeEncode: 'Text→Unicode', hexEncode: 'Hex Encode', hexDecode: 'Hex Decode',
      md5: 'MD5', sha1: 'SHA1', sha256: 'SHA256', jwtDecode: 'JWT Decode', cookieParse: 'Cookie Parse',
      utf8Encode: 'UTF-8 Encode', utf8Decode: 'UTF-8 Decode', utf16Encode: 'UTF-16 Encode', utf16Decode: 'UTF-16 Decode'
    },
    placeholders: {
      base64Encode: 'Enter text to encode...', base64Decode: 'Enter Base64 string...',
      urlEncode: 'Enter URL or text to encode...', urlDecode: 'Enter URL-encoded string...',
      unicodeDecode: 'Enter Unicode e.g. \\u0048\\u0069...', unicodeEncode: 'Enter text...',
      hexEncode: 'Enter text to hex encode...', hexDecode: 'Enter hex string...',
      md5: 'Enter text to hash with MD5...', sha1: 'Enter text to hash with SHA1...', sha256: 'Enter text to hash with SHA256...',
      jwtDecode: 'Enter JWT token...', cookieParse: 'Enter cookie string...',
      utf8Encode: 'Enter text...', utf8Decode: 'Enter UTF-8 encoded bytes...',
      utf16Encode: 'Enter text...', utf16Decode: 'Enter UTF-16 encoded bytes...'
    }
  },
  timestamp: {
    title: 'Timestamp Calculator', desc: 'Convert between timestamps and dates, supports seconds/milliseconds',
    currentTime: 'Current Time', localTime: 'Local Time', utcTime: 'UTC Time',
    tsSeconds: 'Timestamp (seconds)', tsMilliseconds: 'Timestamp (ms)', iso8601: 'ISO 8601', weekday: 'Day of Week',
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    tsToDate: 'Timestamp → Date', dateToTs: 'Date → Timestamp', freeParse: 'Free Format Parsing',
    tsPlaceholder: 'Enter timestamp (seconds or ms)', autoDetect: 'Auto Detect', seconds: 'Seconds', milliseconds: 'Milliseconds',
    convert: 'Convert', parse: 'Parse', selectDate: 'Select date & time',
    freePlaceholder: 'Enter any date format, e.g. 2024-01-15, 01/15/2024, Jan 15 2024...',
    cannotParse: 'Cannot parse this date format, try another', copied: 'Copied'
  },
  qrcode: {
    title: 'QR Code Generator', desc: 'Convert links or text to QR codes, download as PNG',
    inputLabel: 'Content:', inputPlaceholder: 'Enter URL or any text...',
    sizeLabel: 'QR Size:', errorLevel: 'Error Correction:', generate: 'Generate QR Code',
    result: 'QR Code Result', download: 'Download PNG', copyImage: 'Copy Image',
    downloadSuccess: 'Downloaded', copySuccess: 'Copied to clipboard', copyFailed: 'Copy failed, try downloading', generateFailed: 'Generation failed'
  },
  password: {
    title: 'Password Generator', desc: 'Custom length and character types, batch generate secure passwords',
    length: 'Length:', lengthHint: '(4-64)', count: 'Count:', countHint: '(1-50)',
    charTypes: 'Character types:', digits: 'Digits 0-9', lowercase: 'Lowercase a-z', uppercase: 'Uppercase A-Z', symbols: 'Symbols !@#$%^&*',
    generate: 'Generate', generated: 'Generated passwords', copyAll: 'Copy All', regenerate: 'Regenerate',
    copied: 'Copied', copiedAll: 'All passwords copied', strength: { strong: 'Strong', medium: 'Medium', weak: 'Weak' }
  },
  diff: {
    title: 'Diff Checker', desc: 'JSON diff & text diff with highlighted differences',
    textDiff: 'Text Diff', jsonDiff: 'JSON Diff', leftInput: 'Original', rightInput: 'Compare', clear: 'Clear',
    leftPlaceholder: 'Enter original JSON...', rightPlaceholder: 'Enter JSON to compare...',
    leftTextPlaceholder: 'Enter original text...', rightTextPlaceholder: 'Enter text to compare...',
    same: 'Same', added: 'Added', removed: 'Removed', modified: 'Modified', lines: 'lines',
    emptyInput: 'Please enter content to compare', jsonError: 'JSON format error'
  },
  imageBase64: {
    title: 'Image to Base64', desc: 'Convert image files to Base64 encoded strings',
    upload: 'Upload Image', uploadHint: 'Supports JPG, PNG, GIF, SVG, WebP, BMP',
    dropText: 'Drop image here or', clickUpload: 'click to upload',
    result: 'Base64 Result', resultPlaceholder: 'Result will appear here',
    pureBase64: 'Base64', dataUri: 'Data URI', html: 'HTML', css: 'CSS',
    copy: 'Copy', download: 'Download', copied: 'Copied', downloadSuccess: 'Downloaded',
    fileTooBig: 'File too large, please choose an image under 20MB', readFailed: 'Failed to read file',
    chars: 'chars', kChars: 'K chars'
  },
  crontab: {
    title: 'Crontab Tool', desc: 'Visual Crontab expression builder with field highlighting',
    exprLabel: 'Crontab Expression:', minute: 'Minute', hour: 'Hour', day: 'Day', month: 'Month', week: 'Week',
    randomDemo: 'Random Demo', copy: 'Copy', copied: 'Copied', valid: 'Valid', invalid: 'Invalid',
    presets: 'Quick Presets', fieldDesc: 'Field Description', range: 'Range', preview: 'Execution Preview',
    nextRuns: 'Next 10 runs:', computing: 'Computing...', enterValid: 'Enter a valid Crontab expression',
    presetsList: ['Every minute', 'Every 5 min', 'Every hour', 'Daily at 0:00', 'Daily at 8:00', 'Weekdays 9:00', 'Monday 0:00', '1st of month', 'Every 15 min', 'Every 6 hours', 'Every 30 min', 'Weekdays every 2h'],
    fieldExamples: {
      minute: [{ val: '*', desc: 'every min' }, { val: '*/5', desc: 'every 5 min' }, { val: '0', desc: 'at min 0' }, { val: '0,30', desc: 'at 0,30' }, { val: '0-10', desc: '0 to 10' }],
      hour: [{ val: '*', desc: 'every hour' }, { val: '*/2', desc: 'every 2h' }, { val: '0', desc: 'at 0:00' }, { val: '9,18', desc: 'at 9,18' }, { val: '9-17', desc: '9 to 17' }],
      day: [{ val: '*', desc: 'every day' }, { val: '1', desc: '1st' }, { val: '1,15', desc: '1st & 15th' }, { val: '*/7', desc: 'every 7 days' }, { val: 'L', desc: 'last day' }],
      month: [{ val: '*', desc: 'every month' }, { val: '1', desc: 'Jan' }, { val: '1,6', desc: 'Jan & Jun' }, { val: '*/3', desc: 'every 3 mo' }, { val: '1-6', desc: 'Jan to Jun' }],
      week: [{ val: '*', desc: 'every day' }, { val: '0', desc: 'Sun' }, { val: '1-5', desc: 'Mon-Fri' }, { val: '0,6', desc: 'Sat & Sun' }, { val: '*/2', desc: 'every 2 days' }]
    },
    fieldRanges: { minute: '0-59', hour: '0-23', day: '1-31', month: '1-12', week: '0-7 (0=Sun)' },
    errors: { minute: 'Invalid minute (0-59)', hour: 'Invalid hour (0-23)', day: 'Invalid day (1-31)', month: 'Invalid month (1-12)', week: 'Invalid weekday (0-7)' }
  }
}
