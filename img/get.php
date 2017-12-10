<?php
/**
 * Created by PhpStorm.
 * User: ms
 * Date: 2017/12/9
 * Time: 18:58
 */
header("content-type:text/html;charset=utf8");
$db=new mysqli("localhost",'root','','undercover');
$db->query('set names utf8');
$sql="select * from words order by rand() limit 1";
$result=$db->query($sql);
$row=$result->fetch_assoc();
echo json_encode($row);