import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001';

// 登録場所を描画するコンポーネント
const RecordForm = (props) => {
  // 入力されたnameとtimeの保存場所
  const [nameInput, setNameInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');

  // inputに入力された文を描画する
  const handleNameChange = (e) => {
      setNameInput(e.currentTarget.value);
  }
  const handleTQuantityChange = (e) => {
      setQuantityInput(e.currentTarget.value);
  }
  // 登録ボタンが押されたらエラーを出すか、inputの値を描画するためにsetする
  const handleOnAdd = (e) => {
    e.preventDefault();
    if (nameInput === `` && quantityInput === ``) {
        alert(`名前と数量が入力されていません`);
        return false;
    }
    if (nameInput === ``) {
        alert(`名前が入力されていません`);
        return false;
    }
    if (quantityInput === ``) {
        alert(`数量が入力されていません`);
        return false;
    }
    props.onAdd(nameInput, quantityInput);
    setNameInput('');
    setQuantityInput('');
  }

  return (
      <>
        <section className="record">
            <input
            className="name"
            type="text"
            // 値
            value={nameInput}
            // 変化が起きたら
            onChange={handleNameChange}
            />
            <input
            className="quantity"
            type="number"
            value={quantityInput}
            onChange={handleTQuantityChange}
            />
            {/* ボタンが押されたら */}
            <button className="recordButton" onClick={handleOnAdd}>登録</button>
        </section>
      </>
  );
}

function Item(props) {
  const handleDeleteClick = () => {
    props.onDeleteClick(props.item.id);
  };

  return(
    <section className='item'>
        <div className='name'>
          {props.item.name}
        </div>
        <div className='quantity'>
          {props.item.quantity}個
        </div>
        <button className="deleteButton" onClick={handleDeleteClick}>削除</button>
    </section>
  );
}


function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(`${API_URL}/api/items`);
      setItems(response.data);
    };
    fetchItems();
  }, []);
  //nameとquantityが入力されていたら登録ボタンを押したときに追加される
  const handleAddRecord = (name, quantityStr) => {
    const quantity = Number(quantityStr);
    const newItems = [...items];
    const exist = newItems.find((x) => x.name === name);

    if(exist){
      const updated = newItems.map((x) => {
        return x.name === name
          ? { ...x, quantity: x.quantity + quantity }
          : x;
      });
      setItems(updated);
      return;
    }else{
      // オブジェクトを生成して配列にpush
      newItems.push({
          id: Date.now(),
          name: name,
          quantity: quantity,
      });
    }
    setItems(newItems);
  };

  // 削除ボタン用
  const handleUserDeleteClick = (id) => {
      if(!window.confirm('削除しますか？')) {
          return;
      }
      const newItems = items.filter((item) => {
          return item.id !== id;
      });
      setItems(newItems);
  };


    const itemsObject = items.map((item) => {
    return (
      <Item
          key={item.id}
          item={item}
          onDeleteClick={handleUserDeleteClick}
      />
      );
  });

  return (
    <div className="App">
        <div className="App-header">
          <h1>在庫管理アプリ</h1>
        </div>
        <RecordForm onAdd = {handleAddRecord} />
        <div className="App-main">
        <h2>商品一覧</h2>
          {itemsObject}
        </div>
        <div className="App-footer">
          <p>© 2025 在庫管理アプリ</p>
        </div>
    </div>
  );
}

export default App;

