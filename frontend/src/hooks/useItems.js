import { useEffect, useState } from 'react';
// apiファイルから読み込み
import {
  fetchItems,
  createItem,
  updateQuantity,
  deleteItem
} from '../api/itemsApi';

// useItemsを外部から読み込めるようにするための宣言
export const useItems = () => {
  const [items, setItems] = useState([]);

//   apiを叩いてitemsに在庫情報をset
  const loadItems = async () => {
    const res = await fetchItems();
    setItems(res.data);
  };

  useEffect(() => {
    loadItems();
  }, []);

//    在庫追加、更新関数
  const addItem = async (name, quantity) => {
    const exist = items.find(x => x.name === name);

    if (exist) {
      await updateQuantity(exist.id, exist.quantity + quantity);
    } else {
      await createItem(name, quantity);
    }
// データに更新をいれた後に再読み込みすることで反映
    await loadItems();
  };

//   在庫削除関数
  const removeItem = async (id) => {
    await deleteItem(id);
    // データに更新をいれた後に再読み込みすることで反映
    await loadItems();
  };

//useItemsに入っている関数名の宣言
  return {
    items,
    addItem,
    removeItem
  };
};
