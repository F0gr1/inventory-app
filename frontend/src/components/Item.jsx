const Item = ({ item, onDeleteClick }) => {
  return (
    <section className="item">
      <div className="name">{item.name}</div>
      <div className="quantity">{item.quantity}個</div>

      <button
        className="deleteButton"
        onClick={() => onDeleteClick(item.id)}
      >
        削除
      </button>
    </section>
  );
};

export default Item;
