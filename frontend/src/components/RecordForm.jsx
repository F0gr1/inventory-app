import { useNewItemForm } from '../hooks/useNewItemForm';

const RecordForm = ({ onAdd }) => {
  const {
    name,
    quantity,
    setName,
    setQuantity,
    reset
  } = useNewItemForm();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' && quantity === '') {
      alert('名前と数量が入力されていません');
      return;
    }
    if (name === '') {
      alert('名前が入力されていません');
      return;
    }
    if (quantity === '') {
      alert('数量が入力されていません');
      return;
    }

    onAdd(name, Number(quantity));
    reset();
  };

  return (
    <form className="record" onSubmit={handleSubmit}>
      <input
        className="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="商品名"
      />

      <input
        className="quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="数量"
      />

      <button className="recordButton" type="submit">
        登録
      </button>
    </form>
  );
};

export default RecordForm;

