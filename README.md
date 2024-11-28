以下は、このプロジェクト用の `README.md` のテンプレートです。プロジェクトの内容や使用方法がわかりやすく記載されています。

---

## AI Quiz App

**AI Quiz App** は、ユーザーがテーマを入力すると、AI（Gemini API）を使用して 4 択形式のクイズを生成するウェブアプリケーションです。このアプリでは、クイズの選択肢を選ぶと正解・不正解のフィードバックが表示され、同じテーマで次の問題を生成することも可能です。

### **デモ画像**

![image](https://github.com/user-attachments/assets/127139ad-c6a8-4fbd-81fe-ca0a844cd3a9)

---

### **機能一覧**

- テーマに基づいてクイズを生成
- クイズ選択肢のクリックで正解/不正解をフィードバック
- 「次へ」ボタンで同じテーマの新しいクイズを生成

---

### **プロジェクト構成**

```plaintext
ai-quiz-app/
├── backend/   # バックエンド（Next.js + Gemini API）
├── frontend/  # フロントエンド（Nuxt.js）
└── README.md  # プロジェクト説明
```

---

### **使用技術**

#### フロントエンド

- Nuxt.js3
- TypeScript

#### バックエンド

- Next.js
- TypeScript
- Gemini API

#### その他

- Node.js
- Git

---

### **環境構築**

#### 1. リポジトリのクローン

```bash
git clone https://github.com/username/ai-quiz-app.git
cd ai-quiz-app
```

#### 2. フロントエンドセットアップ

```bash
cd frontend
npm install
npm run dev
```

#### 3. バックエンドセットアップ

```bash
cd ../backend
npm install
npm run dev
```

#### 4. 環境変数の設定

- `backend` ディレクトリに `.env` ファイルを作成し、以下の内容を追加してください：

```env
GEMINI_API_KEY=your_gemini_api_key
```

---

### **使用方法**

1. ローカルサーバーを起動する

   - フロントエンド：`http://localhost:3000`
   - バックエンド：`http://localhost:3001`

2. フロントエンドのフォームにテーマを入力し、「クイズを生成」ボタンをクリック。

3. クイズが表示されたら、選択肢をクリックして正解/不正解を確認。

4. 「次へ」ボタンを押して新しいクイズを生成。

---

### **今後の改善予定**

- マルチプレイヤーモードの追加
- クイズの難易度調整
- ユーザーの解答履歴を記録する機能
- モバイル対応の UI デザイン改善

---

### **貢献方法**

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/your-feature`)
3. 変更をコミット (`git commit -m "Add your feature"`)
4. ブランチをプッシュ (`git push origin feature/your-feature`)
5. プルリクエストを作成

---
