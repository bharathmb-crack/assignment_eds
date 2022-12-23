(async () => {
  const data = await fetch("./data.json");
  const res = await data.json();

  let analytics_graph = document.querySelector(".analytics__graphContainer");
  let selectedId;
  let selectedDay;

  res.map((val) => {
    // * div that holds graph bar and details div onhover
    let singleGraph_container = document.createElement("div");
    singleGraph_container.classList.add("graph_signle--container");
    analytics_graph.append(singleGraph_container);

    // * div for individual details of amount spent in day that shows on hover
    let detailsContainer = document.createElement("div");
    detailsContainer.classList.add("day_details");
    detailsContainer.innerHTML = ` $ ${val.amount}`;
    detailsContainer.setAttribute("id", val.day);
    singleGraph_container.append(detailsContainer);

    // * div for individual graph stick
    let singleGraph_stick = document.createElement("div");
    singleGraph_stick.classList.add("graph_stick");
    singleGraph_stick.setAttribute("id", val.id);
    singleGraph_stick.style.backgroundColor = val.bgcolor;
    singleGraph_stick.style.height = `${val.amount * 5.5}px`;
    singleGraph_container.append(singleGraph_stick);

    // * div for mon tue wed
    let individual = document.createElement("div");
    individual.innerHTML = val.day;
    individual.classList.add("individual_days");
    singleGraph_container.append(individual);
  });

  let graph_stick = document.querySelectorAll(".graph_stick");
  for (let i = 0; i < graph_stick.length; i++) {
    graph_stick[i].addEventListener("mouseover", (e) => {
      e.target.style.backgroundColor = selectedId = e.target.id;
      selectedDay = res.filter((val) => val.id == e.target.id);
      selectedDay.map((data) => {
        selectedDay.day = data.day;
      });
      let nodeofClass = document.getElementById(selectedDay.day);
      nodeofClass.style.display = "block";
    });
  }
  for (let i = 0; i < graph_stick.length; i++) {
    graph_stick[i].addEventListener("mouseout", (e) => {
      selectedId = e.target.id;
      selectedDay = res.filter((val) => val.id == e.target.id);
      selectedDay.map((data) => {
        selectedDay.day = data.day;
      });
      let nodeofClass = document.getElementById(selectedDay.day);
      nodeofClass.style.display = "none";
    });
  }
})();
