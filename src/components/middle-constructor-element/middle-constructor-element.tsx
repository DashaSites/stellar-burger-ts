import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import constructorStyles from "../burger-constructor/burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteIngredient } from "../../services/actions/constructorActions";
import { ConstructorIngredientWithKey, Ingredient as IngredientModel } from "../../utils/burger-api-types";

//import PropTypes from "prop-types";
//import { ingredientPropType } from "../../utils/prop-types.js";


type Props = {
  element: ConstructorIngredientWithKey,
  index: number,
  moveIngredient: (dragIndex: number, hoverIndex: number) => void,
  children?: React.ReactNode
};

// Type для useDrag и accept для useDrop в одной переменной
const dndType = "sortedIngredient";

export const MiddleConstructorElement = ({ element, index, moveIngredient }: Props): React.JSX.Element => {
  
  const dispatch = useDispatch();

  const ref = useRef<HTMLLIElement | null>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: dndType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveIngredient(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  
  const [{ isDragging }, drag] = useDrag({
    type: dndType,
    item: () => {
      return {
        id: element._id,
        index: index,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li
      className={`${constructorStyles.transposableElement} mt-4`}
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => dispatch(deleteIngredient(element.key))}
      />
    </li>
  );
};


// MiddleConstructorElement.propTypes = {
//   element: ingredientPropType.isRequired,
//   index: PropTypes.number.isRequired,
//   moveIngredient: PropTypes.func.isRequired
// };