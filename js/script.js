const BASE_URL =
  "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";

const menuContainer = document.getElementById("allMenuItems");
const orderNowBtn = document.getElementById("orderNow");
const getMenu = async (url) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    return err;
  }
};

getMenu(BASE_URL)
  .then((res) => {
    res.forEach((item) => {
      const container = document.createElement("div");
      // food name
      const headingTag = document.createElement("h1");
      headingTag.innerText = item.name;
      container.appendChild(headingTag);

      // food image
      // const foodImage = document.createElement("img");
      const foodImage = new Image(100, 200);
      foodImage.src = item.imgSrc;
      container.appendChild(foodImage);

      //  food price
      const price = document.createElement("h3");
      price.innerText = item.price;
      container.appendChild(price);

      // add button
      const buttonTag = document.createElement("button");
      buttonTag.innerHTML = "Add item";
      container.appendChild(buttonTag);
      // console.log(headingTag);
      // menuContainer.appendChild(headingTag);
      const menuItem = document.querySelector("#allMenuItems");
      menuItem.appendChild(container);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const getOrderedBurger = (allMenuItems) => {
  const randomNo1 = Math.floor(Math.random() * allMenuItems.length) + 1;
  const randomNo2 = Math.floor(Math.random() * allMenuItems.length) + 1;
  const randomNo3 = Math.floor(Math.random() * allMenuItems.length) + 1;
  return {
    burger1: allMenuItems[randomNo1].name,
    burger2: allMenuItems[randomNo2].name,
    burger3: allMenuItems[randomNo3].name,
  };
};

const TakeOrder = (allMenuItems) => {
  return new Promise((resolve, reject) => {
    const chooseThreeBurger = getOrderedBurger(allMenuItems);
    setTimeout(() => {
      resolve(chooseThreeBurger);
    }, 2500);
  });
};

const orderPrep = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        order_status: true,
        paid: false,
      });
    }, 1000);
  });
};

const payOrder = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        order_status: true,
        paid: true,
      });
    }, 1000);
  });
};

const thankyouFnc = (orderStatus) => {
  return orderStatus
    ? alert("thankyou for eating with us today!")
    : alert("Please pay the order amount");
};

const orderNow = async () => {
  const allMenuItems = await getMenu(BASE_URL);
  const allChosenBurger = await TakeOrder(allMenuItems);

  const orderObj = await orderPrep();

  const { paid } = await payOrder();
  thankyouFnc(paid);
};

orderNowBtn.addEventListener("click", orderNow);



