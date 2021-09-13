import React, { useState } from "react";
import Recipes from "./Recipes/Recipes";
import daysColumns from "./Lista/dias";
import { useSelector, useDispatch } from "react-redux";
import { postcalendar } from "../../actions/index";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import style from "../../Styles/StyleCardShop.module.css";
import { Link } from "react-router-dom";

export default function ShopingCart() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeCalendar);
  const [initialValues, setInitialValues] = useState(daysColumns);
  const [reOrder, setReOrder] = useState([...recipes]);
  const [text, setText] = useState("");
  const [sens, setSens] = useState([]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    )
      return;

    const start = initialValues.colums[result.source.droppableId];
    const end = initialValues.colums[result.destination.droppableId];

    if (start === end && start && end) {
      const newRecipe = Array.from(start.recipes);
      newRecipe.splice(result.destination.index, 0, result.draggableId);

      const newColumn = {
        ...start,
        recipes: newRecipe,
      };

      const newState = {
        ...initialValues,
        colums: {
          ...initialValues.colums,
          [newColumn.name]: newColumn,
        },
      };

      setInitialValues(newState);
      return;
    }
    if (result.destination.droppableId !== "recipes") {
      const items = Array.from(reOrder);
      const [reord] = items.splice(result.source.index, 1);

      const newRecipe = Array.from(end.recipes);
      newRecipe.splice(result.destination.index, 0, reord.name);

      const newColumn = {
        ...end,
        recipes: newRecipe,
      };

      const newState = {
        ...initialValues,
        colums: {
          ...initialValues.colums,
          [newColumn.name]: newColumn,
        },
      };

      setSens([...sens, reord.id]);

      setReOrder(items);
      setInitialValues(newState);
      return;
    }
   
  };

  const onSubmit = () => {
    dispatch(postcalendar(text, sens));
  };
  const handeChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={style.contenAll}>
      <div className="mb-3" id={style.btn}>
        <label className="form-label">Ingrese un nombre al calendario</label>
        <input className='form-control' id={style.nameCalendar} type="text" onChange={(e) => handeChange(e)} />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Recipes reOrder={reOrder} />
        <div className={style.contenedorCalendar}>
        {initialValues.columsOrder?.map((e, index) => (
          <Droppable droppableId={e}>
            {(provider) => (
              <div className={style.horarios} {...provider.droppableProps} ref={provider.innerRef}>
                <div >
                  <h3>{e}</h3>
                  <Draggable
                    key={initialValues.colums[e].id}
                    draggableId={initialValues.colums[e].id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        {initialValues.colums[e].recipes?.map((x, con) => {
                          return (
                            <h5 key={con} className={style.changer}>
                              {x}
                            </h5>
                          );
                        })}
                      </div>
                    )}
                  </Draggable>
                  {provider.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}

        </div>
      </DragDropContext>
      <div className={style.buttonsContent}>
        <button id={style.btn} className='btn btn-primary' onClick={onSubmit}>Guardar calendario</button>
        <Link id={style.btn} className='btn btn-primary' to="/calendar">Ver mis calendarios</Link>
      </div>
    </div>
  );
}
