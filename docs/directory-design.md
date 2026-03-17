## directory-design

mini-ai-scribe
│
├ README.md
├ .gitignore
├ docker-compose.yml
│
├ frontend
│   ├ package.json
│   ├ next.config.js
│   ├ tsconfig.json
│   │
│   ├ app
│   │   ├ page.tsx
│   │   ├ layout.tsx
│   │   └ globals.css
│   │
│   ├ components
│   │   ├ TextInput.tsx
│   │   ├ ModeButtons.tsx
│   │   ├ ResultCard.tsx
│   │   ├ CopyButton.tsx
│   │   └ LoadingDots.tsx
│   │
│   ├ hooks
│   │   └ useRewrite.ts
│   │
│   ├ lib
│   │   └ api.ts
│   │
│   └ types
│       └ api.ts
│
├ backend
│   ├ requirements.txt
│   ├ main.py
│   │
│   ├ api
│   │   └ rewrite.py
│   │
│   ├ services
│   │   └ gemini_service.py
│   │
│   ├ models
│   │   └ rewrite_model.py
│   │
│   ├ utils
│   │   ├ text_cleaner.py
│   │   └ logger.py
│   │
│   └ config
│       └ settings.py
│
└ docs
    ├ architecture.md
    └ api-spec.md