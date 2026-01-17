// カスタムフックの「読み込み
import { useItems } from './hooks/useItems';
// 別ファイルのコンポーネントの読み込み
import RecordForm from './components/RecordForm';
import ItemList from './components/ItemList';

function App() {
  // カスタムフックの中に入っているものの宣言
  const { items, addItem, removeItem } = useItems();

  return (
    <div className="App">
      <h1>在庫管理アプリ</h1>

      <RecordForm onAdd={addItem} />
      <ItemList items={items} onDelete={removeItem} />
    </div>
  );
}

export default App;

