# Gemini 챗봇

Gemini API와 Streamlit을 사용한 기본적인 챗봇 프레임워크입니다.

## 기능

- Gemini 1.5 Flash 모델을 사용한 대화형 챗봇
- 대화 컨텍스트 유지
- Streamlit을 통한 직관적인 사용자 인터페이스
- 안전한 API 키 관리

## 설치 방법

1. 필요한 패키지 설치:
```bash
pip install -r requirements.txt
```

2. `.streamlit/secrets.toml` 파일 생성:
```toml
GOOGLE_API_KEY = "your-api-key-here"
```

## 실행 방법

```bash
streamlit run app.py
```

## 주의사항

- API 키는 반드시 `.streamlit/secrets.toml` 파일에 저장해야 합니다.
- Streamlit Cloud에 배포할 경우, 웹 대시보드에서 secrets를 설정해야 합니다. 