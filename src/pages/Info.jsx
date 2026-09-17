import React, { useEffect, useState } from "react";
import PrevButton from "../components/PrevButton";
import InfoInput from "../components/InfoInput";
import AddButton from "../components/AddButton";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Info = ( {sendIngredients} ) => {
  // logic
  const history = useNavigate();
  
  const [ingredients, setIngredients] = useState([]); // 사용자가 입력할 재료
  
  /* 재료 추가 버튼 클릭 시 */
  const addIngredient = () => { // 재료 추가 버튼 클릭 시

    const id = Date.now();

    const newItem = { 
      id, 
      label: `ingredients-${id}`,
      text: "재료명", 
      value: ""
    };

    // state값 변경
    setIngredients((previousIngredients) => [...previousIngredients, newItem]);
  };

  /* 다음 버튼 클릭 시 */
  const handleNext = () => {
    // console.log("chat페이지로 이동"); // 구현완료로 주석처리
    // react-router-dom을 이용한 페이지 이동
    sendIngredients(ingredients)
    history("/chat");
  };

  /* 재료 삭제하기 */
  const handleRemove = (selectedId) => {
    // 사용자가 클릭한 요소를 제외한 남은 재료 리스트 만들기
    const filterIngredientList = ingredients.filter((ingredient) => ingredient.id !== selectedId)

    setIngredients(filterIngredientList)
  };
  
  /* 재료 변경하기 */
  const handleChange = (data) => {
    //console.log("🚀 ~ handleChange ~ data:", data)
    // map : 재료 리스트에서 재료 데이터 가져오기
    const changedIngredient = ingredients.map((ingredient) => ingredient.id === data.id ? data : ingredient )

    setIngredients(changedIngredient)
  };

  /* 페이지 새로고침 방지 */
  const handleSubmit = (event) => {
    // 재료 데이터 전송(페이지 새로고침 막기)
    event.preventDefault();
    //console.log(ingredients);
  }

  useEffect(() => {
    console.log("🚀 ingredients:", ingredients)
  }, [ingredients])

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* TODO:Title 컴포넌트 */}
        <div className="px-2 pt-6">
          <h1 className="text-4.5xl font-bold tracking-tight leading-tight text-white">
            당신의 냉장고를 <br/>알려주세요🥘
          </h1>
        </div>
        {/* // TODO:Title 컴포넌트 */}

        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form onSubmit={(event) => handleSubmit(event)}>
            {/* START:input 영역 */}
            <div>
              {ingredients.map((item) => (
                <InfoInput key={item.id} content={item} onRemove={handleRemove}
                onChange={handleChange} />
              ))}
            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  );
};

export default Info;
