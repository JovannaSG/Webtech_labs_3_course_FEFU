function getDataForGraphic() {
    let data = getDataTable();
    let dataForGraph = {};
    let n = data.length;
    for (let i = 0; i < n; i++) {
        if (!Object.keys(dataForGraph).includes(data[i][1])) {
            dataForGraph[data[i][1]] = [];
        } else {
            dataForGraph[data[i][1]].push(data[i][1]);
        }
    }
    return dataForGraph;
}


function createGraphic(ox, oy) {
    if (!ox || !oy) {
        alert("Выберите значения осей для графика");
        return;
    }

    // Блокирую постоянную отрисовку графиков
    if (document.querySelector("svg") !== null) {
        document.querySelector("svg").remove();
    }

    let data = getDataForGraphic();
    for (let i in data) {
        let sum = 0;
        for (let j = 0; j < data[i].length; j++) {
            sum += +data[i][j];
        }
        data[i] = sum;
    }

    let dataFG = [];
    for (let i in data) {
        let o = {};
        o["name"] = i;
        o["score"] = data[i];
        dataFG.push(o);
    }
    
    let height = 500, width = 800, margin = 30;
     
    // функция для получения цветов
    let color = d3.scale.category10();
    
    // длина оси X= ширина контейнера svg - отступ слева и справа
    let xAxisLength = width - 2 * margin;     
    
    // длина оси Y = высота контейнера svg - отступ сверху и снизу
    let yAxisLength = height - 2 * margin;
    
    // функция интерполяции значений на ось X
    let xScale = d3.scale.ordinal()
        .rangeRoundBands([0, xAxisLength + margin], .1)
        .domain(dataFG.map(function(d) { return d.name; }));
    
    // функция интерполяции значений на ось Y
    let yScale = d3.scale.linear()
        .domain([   
                d3.min(dataFG, function(d) { return d.score / 1000000; }),
                d3.max(dataFG, function(d) { return d.score / 1000000; })
        ])
        .range([yAxisLength, 0]);
    
    let svg = d3.select(".graphic").append("svg")
        .attr("class", "axis")
        .attr("width", width)
        .attr("height", height);
    
    // создаем ось X   
    let xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    // создаем ось Y             
    var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");
                
    // отрисовка оси Х             
    svg.append("g")       
        .attr("class", "x-axis")
        .attr("transform",
            "translate(" + margin + "," + (height - margin) + ")")
        .call(xAxis);
    
    // отрисовка оси Y 
    svg.append("g")       
        .attr("class", "y-axis")
        .attr("transform",
                "translate(" + margin + "," + margin + ")")
        .call(yAxis);
        
    // рисуем горизонтальные линии 
    d3.selectAll("g.y-axis g.tick")
        .append("line")
        .classed("grid-line", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", xAxisLength)
        .attr("y2", 0);
    
    // создаем элемент g с набором столбиков
    svg.append("g")
        .attr("transform",  // сдвиг оси вправо
              "translate(" + margin + ", 0)")
        .selectAll(".bar")
        .data(dataFG)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.name); })
        .attr("width", xScale.rangeBand())
        .attr("y", function(d) { return yScale(d.score / 1000000); })
        .attr("height", function(d) { return height - yScale(d.score / 1000000) - 30; })
        .attr("fill", function(d) { return color(d.name); });

    svg.append("text")
        .attr("x", margin + 151)
        .attr("y", margin - 11)
        .attr("text-anchor", "end")
        .style("font-size", "11px")
        .text("Длина рыбы в см");
}