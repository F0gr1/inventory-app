import Item from './Item';

const ItemList = ({ items, onDelete }) => {
  if (items.length === 0) {
    return <p>商品が登録されていません</p>;
  }

  return (
    <div className="item-list">
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onDeleteClick={onDelete}
        />
      ))}
    </div>
  );
};

export default ItemList;
