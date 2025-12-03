# Passcend Passgen

**Node.js 및 브라우저를 위한 안전하고 유연하며 종속성이 없는 비밀번호 및 패스프레이즈 생성기입니다.**

사용자 친화적인 CLI 도구와 강력한 TypeScript 라이브러리를 모두 제공합니다. 한국어 패스프레이즈 생성, QWERTY 키보드 변환, Leet Speak, AES-GCM 암호화 등 다양한 보안 기능을 지원합니다.

---

## 🌟 특징 (Features)

*   **🔒 강력한 보안 (Secure)**:
    *   `crypto.getRandomValues` (브라우저) 및 `crypto.randomBytes` (Node.js)를 사용하여 암호학적으로 안전한 난수를 생성합니다.
    *   편향 없는(Bias-free) 알고리즘을 사용하여 예측 불가능성을 보장합니다.
*   **🛠️ 유연성 (Flexible)**:
    *   사용자 정의 문자 세트(대문자, 소문자, 숫자, 특수 문자)를 조합하여 원하는 규칙의 비밀번호를 생성할 수 있습니다.
*   **🗣️ 패스프레이즈 (Passphrases)**:
    *   **영어**: EFF 대용량 단어 목록 (7,776개)을 사용하여 기억하기 쉽고 강력한 패스프레이즈를 생성합니다.
    *   **한국어**: BIP-39 기반의 한국어 단어 목록을 지원합니다.
*   **🔢 PIN 생성기 (PIN Generator)**:
    *   보안성이 강화된 숫자 PIN을 생성합니다.
    *   `1234` 같은 연속된 숫자나 `1111` 같은 반복된 숫자를 자동으로 방지하는 옵션을 제공합니다.
*   **🔠 변환 기능 (Transformations)**:
    *   **QWERTY 변환**: 한국어 발음을 영문 QWERTY 키보드 입력값으로 변환하여 보안성을 높입니다. (예: `홍길동` -> `ghdrlfehd`)
    *   **Leet Speak**: 텍스트를 해커어(1337)로 변환합니다. (예: `password` -> `p455w0rd`)
    *   **Case**: 대문자, 소문자, Titlecase 변환을 지원합니다.
*   **🛡️ 강도 측정기 (Strength Meter)**:
    *   비밀번호의 정보 엔트로피(Entropy)를 비트 단위로 계산합니다.
    *   키보드 패턴(qwerty, asdf 등) 및 단순 반복을 감지하여 보안 경고를 제공합니다.
*   **🔐 AES-GCM 암호화**:
    *   PBKDF2(SHA-256) 키 유도를 사용하는 표준 AES-GCM 암호화/복호화 기능을 제공합니다.
*   **🚫 무의존성 (Zero Dependencies)**:
    *   외부 런타임 라이브러리에 전혀 의존하지 않아 가볍고 안전합니다.
*   **📘 TypeScript 지원**:
    *   100% TypeScript로 작성되어 완벽한 타입 정의를 제공합니다.

---

## 🚀 설치 (Installation)

npm을 사용하여 프로젝트에 설치할 수 있습니다.

```bash
npm install @passcend/passgen
```

---

## 💻 CLI 사용법 (CLI Usage)

이 패키지는 강력한 CLI 도구를 포함하고 있습니다. 설치 없이 `npx`로 바로 실행하거나 전역으로 설치하여 사용할 수 있습니다.

### 실행 방법

```bash
# 설치 없이 바로 실행 (추천)
npx @passcend/passgen [command] [options]

# 또는 전역 설치
npm install -g @passcend/passgen
passgen [command] [options]
```

### 주요 명령어 (Commands)

| 명령어 | 설명 | 예시 |
| :--- | :--- | :--- |
| `password` | 임의의 비밀번호 생성 (기본값) | `passgen password` |
| `passphrase` | 기억하기 쉬운 패스프레이즈 생성 | `passgen passphrase` |
| `pin` | 보안 PIN 번호 생성 | `passgen pin` |
| `strength` | 비밀번호 강도 및 엔트로피 측정 | `passgen strength "mypassword"` |
| `encrypt` | 텍스트 암호화 (AES-GCM) | `passgen encrypt "secret text" --secret "key"` |
| `decrypt` | 텍스트 복호화 (AES-GCM) | `passgen decrypt "encrypted_text" --secret "key"` |

### 옵션 상세 (Detailed Options)

#### 1. 패스프레이즈 (Passphrase)
기억하기 쉬운 단어 조합을 생성합니다.

*   `--lang, -l <code>`: 언어 선택 (`en`: 영어, `ko`: 한국어)
*   `--words, -w <n>`: 단어 수 (기본: 4)
*   `--sep, -s <char>`: 구분자 (기본: `-`)
*   `--qwerty`: **(한국어 전용)** 한글 단어를 QWERTY 영문 키 입력으로 변환
*   `--leet`: Leet speak 적용 (예: `E` -> `3`)
*   `--transform <type>`: 대소문자 변환 (`uppercase`, `lowercase`, `titlecase`)
*   `--no-caps`: 첫 글자 대문자화 끄기
*   `--no-number`: 숫자 포함 끄기

```bash
# 한국어 단어를 QWERTY 영문으로 변환하여 생성
npx @passcend/passgen passphrase --lang ko --qwerty
# 출력 예: rkdskdzhd-dkqjwl-thskan-qkek
```

#### 2. 비밀번호 (Password)
무작위 문자열을 생성합니다.

*   `--length, -l <n>`: 길이 (기본: 16)
*   `--no-special`: 특수문자 제외
*   `--no-numbers`: 숫자 제외
*   `--ambiguous, -a`: 헷갈리는 문자(l, 1, O, 0 등) 포함

#### 3. PIN 번호
금융/보안용 숫자 비밀번호를 생성합니다.

*   `--length, -l <n>`: 길이 (기본: 4)
*   `--allow-seq`: 연속된 숫자 허용 (예: 1234, 기본값: 금지됨)
*   `--allow-repeat`: 반복된 숫자 허용 (예: 0000, 기본값: 금지됨)

#### 4. 암호화/복호화 (Encryption)
AES-GCM 알고리즘을 사용하여 텍스트를 안전하게 보호합니다.

*   `--secret <key>`: (필수) 암호화/복호화 키
*   `--iterations <n>`: PBKDF2 반복 횟수 (기본: 600,000)
*   `--salt-len <n>`: Salt 길이 (기본: 16 bytes)
*   `--iv-len <n>`: IV 길이 (기본: 12 bytes)

---

## 📚 라이브러리 사용법 (Library Usage)

Node.js 또는 브라우저 애플리케이션에서 직접 가져와 사용할 수 있습니다.

### 패스프레이즈 생성

```typescript
import { PasswordGenerator } from '@passcend/passgen';

// 기본 생성
const phrase = PasswordGenerator.generatePassphrase();
// 결과: "Correct-Horse-Battery-Staple5"

// 고급 옵션 (한국어 + QWERTY 변환)
const customPhrase = PasswordGenerator.generatePassphrase({
  language: 'ko',
  qwertyConvert: true,
  numWords: 5,
  leet: true
});
// 결과: "rkdskdzhd-dkqjwl..." (예시)
```

### 비밀번호 생성

```typescript
import { PasswordGenerator } from '@passcend/passgen';

const password = PasswordGenerator.generatePassword({
  length: 24,
  uppercase: true,
  numbers: true,
  special: true
});
```

### PIN 생성

```typescript
import { PasswordGenerator } from '@passcend/passgen';

// 안전한 PIN (연속/반복 숫자 자동 거부)
const safePin = PasswordGenerator.generatePin({ length: 6 });
```

### 비밀번호 강도 측정

```typescript
import { PasswordGenerator } from '@passcend/passgen';

const result = PasswordGenerator.calculateStrength("password123");
console.log(`점수: ${result.score}/4, 엔트로피: ${result.entropy} bits`);
// 경고 메시지 확인
console.log(result.warnings);
```

### 데이터 암호화 (AES-GCM)

```typescript
import { encrypt, decrypt } from '@passcend/passgen';

async function secureData() {
  const secretKey = 'my-super-secret-key';
  const data = 'Sensitive Information';

  // 암호화
  const encrypted = await encrypt(data, secretKey);
  console.log('Encrypted:', encrypted);

  // 복호화
  const original = await decrypt(encrypted, secretKey);
  console.log('Decrypted:', original);
}
```

---

## 📄 라이선스 (License)

이 프로젝트는 **MIT 라이선스** 하에 배포됩니다. 자유롭게 사용, 수정 및 배포할 수 있습니다.
