import {test, expect, describe} from 'vitest';
import { TreeNode } from "#common/structures/TreeNode";

const mockTree = [1, 2, 3];
const mockTree2 = [1,null, 2];
const mockTree3 = [3,9,20,null,null,15,7];
test('测试树', ()=>{
  const node = TreeNode.parse(mockTree);
  const result = TreeNode.toArray(node)
  
  const node2 = TreeNode.parse(mockTree2);
  const result2 = TreeNode.toArray(node2);
  expect(result2).toEqual(mockTree2);
  expect(result).toEqual(mockTree);

})
test('测试树 toArray特殊值', ()=>{
  expect(TreeNode.toArray(null)).toEqual([]);
})

test('测试树 parse 特殊值',() => {
  expect(TreeNode.parse([])).toBeNull();
})
test('测试树 parse mockTree',() => {
  expect(TreeNode.parse(mockTree)).toEqual(new TreeNode(1, new TreeNode(2), new TreeNode(3)));
})
test('测试树 pase mockTree2', () => {
  expect(TreeNode.parse(mockTree2)).toEqual(new TreeNode(1, null, new TreeNode(2)));
})
test('测试树 pase mockTree3', () => {
  expect(TreeNode.parse(mockTree3)).toEqual(new TreeNode(3, new TreeNode(9, null), new TreeNode(20, new TreeNode(15, null) ,new TreeNode(7))));
})
test('测试树 pase mockTree3', () => {
  expect(TreeNode.parse([0])).toEqual(new TreeNode());
})